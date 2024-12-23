import { BASE_URL } from '@/app/config/Base';
import InternalServerException from '@/shared/exceptions/InternalServerException';
import { InternetErrorException } from '@/shared/exceptions/InternetErrorException';
import { handleCleanStoreAndNavigateToLogin } from './handleCleanStoreAndNavigateToLogin';
export abstract class HttpProvider {

  public async post(
    url: string,
    data: Object,
    signal?: AbortSignal
  ): Promise<Response> {
    const token = await this.token();
    return this.fetchData(url, {
      method: "POST",
      redirect: "error",
      headers: {
        "X-CSRF-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal,
    });
  }

  public async postFile(url: string, data: FormData): Promise<Response> {
    const token = await this.token();

    return this.fetchData(url, {
      method: "POST",
      redirect: "error",
      headers: { "X-CSRF-TOKEN": token },
      body: data,
    });
  }

  public async get(url: string, signal?: AbortSignal): Promise<Response> {
    return this.fetchData(url, {
      method: "GET",
      redirect: "error",
      headers: { "Content-Type": "application/json" },
      signal,
    })
      .then((res) => res)
      .catch((err) => {
        if (err.name !== "AbortError") {
          return err;
        }
      });
  }

  public async download(url: string): Promise<Response> {
    return this.fetchData(url, {
      method: "GET",
      mode: "no-cors",
      referrerPolicy: "no-referrer",
    })
      .then((res) => res.blob())
      .then((res) => res)
      .catch((err) => {
        if (err.name !== "AbortError") {
          return err;
        }
      });
  }

  public async getWithResult({ url }: { url: string }) {
    let response: any;
    try {
      response = await this.get(url);
    } catch (error) {
      throw new InternetErrorException();
    }
    if (response.status === 500) {
      throw new InternalServerException();
    }
    try {
      return await response.json();
    } catch (error) {
      throw new InternalServerException();
    }
  }

  public async postWithResult
    ({
      url,
      command,
    }: {
      url: string;
      command: Object;
    }) {
    let response: any;
    try {
      response = await this.post(url, command);
    } catch (error) {
      throw new InternetErrorException();
    }
    if (response.status === 500) {
      throw new InternalServerException();
    }
    try {
      return await response.json();
    } catch (error) {
      throw new InternalServerException();
    }
  }

  public async postFileWithResult({ url, data }: {
    url: string,
    data: FormData
  }) {
    let response: any;
    try {
      response = await this.postFile(url, data);
    } catch (error) {
      throw new InternetErrorException();
    }
    if (response.status === 500) {
      throw new InternalServerException();
    }
    try {
      return await response.json();
    } catch (error) {
      throw new InternalServerException();
    }
  }

  private async fetchData(
    url: string,
    requestInit?: RequestInit
  ): Promise<Response> {
    let fetchUrl = url;
    if (!url.includes("http")) {
      fetchUrl = BASE_URL + url;
    }
    return new Promise((resolve, reject) => {
      return fetch(fetchUrl, {
        ...requestInit,
        redirect: "manual",
        signal: requestInit?.signal,
      })
        .then(async (response) => {
          if (
            !response.status ||
            response.status === 500 ||
            response.status === 405
          ) {
            return resolve(response);
          }

          if (response.status === 419) {
            window.location.reload();
            return resolve(response);
          }

          if (response.status === 403) {
            handleCleanStoreAndNavigateToLogin();
            return resolve(response);
          }

          const responseJson = await response.clone().json();
          if (responseJson === "Unauthorized") {
            handleCleanStoreAndNavigateToLogin();
            return resolve(response);
          }
          return resolve(response);
        })
        .catch((value) => {
          reject(value);
        });
    });
  }

  private async token(): Promise<string> {
    return '';
  }
}