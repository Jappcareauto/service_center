/* eslint-disable @typescript-eslint/no-explicit-any */

import { CustomEventData } from "@/shared/events/CustomEventData";
import { EventsKey } from "@/shared/events/EventsKey";
import { useEffect, useState } from "react";
import { ModalEventKey } from "./ModalEventKey";

export interface ModalBehavior {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useModal = (
  {
    eventName,
    callback

  }:
    { eventName?: ModalEventKey, callback?: (data?: any) => void } = {} as any
): ModalBehavior => {
  const [isOpen, setIsOpen] = useState(false);


  const handleListenModalEvent = (event: CustomEvent<CustomEventData<ModalEventsProps>>) => {
    if (eventName !== event.detail.data.eventName) return;
    setIsOpen(event.detail.data.isOpen);
    callback?.(event.detail.data.data)
  }

  useEffect(() => {
    if (!eventName) return;
    window.addEventListener(EventsKey.MODAL, handleListenModalEvent);
    return () => {
      window.removeEventListener(EventsKey.MODAL, handleListenModalEvent);
    }
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }
}

interface ModalEventsProps {
  eventName?: string;
  isOpen: boolean;
  data?: object
}

export class ModalEvents {
  private static dispatch(props: ModalEventsProps) {
    window.dispatchEvent(new CustomEvent<CustomEventData<ModalEventsProps>>(EventsKey.MODAL, {
      detail: {
        data: props
      }
    }));
  }

  static open(eventName: ModalEventKey) {
    ModalEvents.dispatch({
      eventName,
      isOpen: true,
    });
  }

  static close(eventName: ModalEventKey) {
    ModalEvents.dispatch({
      eventName,
      isOpen: false,
    });
  }

  static openWithData<T extends object | undefined>(eventName: ModalEventKey, data: T) {
    ModalEvents.dispatch({
      eventName,
      isOpen: true,
      data
    })
  }
}