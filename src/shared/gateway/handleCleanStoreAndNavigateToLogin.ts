import { AuthRoutes } from '@/modules/auth/infra/routes/Router';
import { CustomEventData } from '../events/CustomEventData';
import { EventsKey } from '../events/EventsKey';


export const handleCleanStoreAndNavigateToLogin = () => {
  // Notify.alert({
  //   msg: message ?? "Vous n'avez pas le droit d'accéder à cette ressource, veuillez vous reconnecter s'il vous plait",
  //   type: AlertType.ERROR,
  //   toastId: "logout"
  // });
  setTimeout(() => {
    localStorage.clear();
    dispatchLogoutEvent();
    window.open(AuthRoutes.login, "_self");
  }, 3000)
}

const dispatchLogoutEvent = () => {
  const event = new CustomEvent<CustomEventData<boolean>>(EventsKey.LOGOUT,
    {
      detail: {
        data: true,
      },
    });
  window.dispatchEvent(event);
}