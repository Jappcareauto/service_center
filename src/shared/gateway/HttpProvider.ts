/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BASE_URL } from "@/app/config/Base";
import InternalServerException from "@/shared/exceptions/InternalServerException";
import { InternetErrorException } from "@/shared/exceptions/InternetErrorException";
import { handleCleanStoreAndNavigateToLogin } from "./handleCleanStoreAndNavigateToLogin";
import dayjs from "dayjs";
import { LocalStorageKey } from "../enums/LocalStorageKey";

interface Token {
  accessToken: string;
  accessTokenExpiry: number;
  refreshToken: string;
  refreshTokenExpiry: number;
}
export abstract class HttpProvider {
  public async post(
    url: string,
    data: object,
    signal?: AbortSignal
  ): Promise<Response> {
    const token = await this.token();
    return this.fetchData(url, {
      method: "POST",
      redirect: "error",
      headers: {
        "X-CSRF-TOKEN": token,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal,
    });
  }
  public async put(
    url: string,
    data: object,
    signal?: AbortSignal
  ): Promise<Response> {
    const token = await this.token();
    return this.fetchData(url, {
      method: "PUT",
      redirect: "error",
      headers: {
        "X-CSRF-TOKEN": token,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal,
    });
  }
  public async patch(
    url: string,
    signal?: AbortSignal
  ): Promise<Response> {
    const token = await this.token();
    return this.fetchData(url, {
      method: "PATCH",
      redirect: "error",
      headers: {
        "X-CSRF-TOKEN": token,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      signal,
    });
  }
  public async delete(url: string, signal?: AbortSignal): Promise<Response> {
    const token = await this.token();
    return this.fetchData(url, {
      method: "DELETE",
      redirect: "error",
      headers: {
        "X-CSRF-TOKEN": token,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      signal,
    });
  }

  public async postFile(url: string, data: FormData): Promise<Response> {
    const token = await this.token();

    return this.fetchData(url, {
      method: "PUT",
      redirect: "error",
      headers: { "X-CSRF-TOKEN": token },
      body: data,
    });
  }

  public async get(url: string, signal?: AbortSignal): Promise<Response> {
    const token = await this.token();
    return this.fetchData(url, {
      method: "GET",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
    const token = await this.token();
    return this.fetchData(url, {
      method: "GET",
      mode: "no-cors",
      referrerPolicy: "no-referrer",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  public async deleteWithResult({ url }: { url: string }) {
    let response: any;
    try {
      response = await this.delete(url);
      console.log("response", response);
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

  public async postWithResult({
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
  public async putWithResult({
    url,
    command,
  }: {
    url: string;
    command: object;
  }) {
    let response: any;
    try {
      response = await this.put(url, command);
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
  public async patchWithResult({
    url, 
  }: {
    url: string;
  }) {
    let response: any;
    try {
      response = await this.patch(url);
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

  public async postFileWithResult({
    url,
    data,
  }: {
    url: string;
    data: FormData;
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
    const auth = localStorage.getItem("AUTH_ACCESS");
    if (!auth) {
      handleCleanStoreAndNavigateToLogin();
      return "";
    }
    try {
      const token: Token = JSON.parse(auth);
      // console.log('token', token.accessTokenExpiry)

      const accessTokenExpiryTimestamp = token.accessTokenExpiry;
      const refreshTokenExpiryTimestamp = token.refreshTokenExpiry;
      const currentTime = dayjs().valueOf();

      const accessTokenTimeLeft = accessTokenExpiryTimestamp - currentTime;
      const refreshTokenTimeLeft = refreshTokenExpiryTimestamp - currentTime;
      console.log("isTockenExpired", accessTokenTimeLeft);
      console.log("isTockenExpired", refreshTokenTimeLeft);

      if (accessTokenTimeLeft < 1) {
        console.log("Token have expired");
        const response = await fetch(BASE_URL + "/auth/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: token.refreshToken }),
        });
        const newAccess: Token = await response.json();

        console.log("newAccess", newAccess);
        const {
          accessToken,
          refreshToken,
          accessTokenExpiry,
          refreshTokenExpiry,
        } = newAccess;

        localStorage.setItem(
          LocalStorageKey.AUTH_ACCESS,
          JSON.stringify({
            accessToken,
            refreshToken,
            accessTokenExpiry,
            refreshTokenExpiry,
          })
        );
        return newAccess.accessToken;
      }
      if (refreshTokenTimeLeft < 1) {
        // handleCleanStoreAndNavigateToLogin();
        return "";
      }
      return token.accessToken;
    } catch (error) {
      console.log("error", error);
      // handleCleanStoreAndNavigateToLogin();
      return "";
    }
  }
}
