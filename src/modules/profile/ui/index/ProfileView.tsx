import IMAGES from "@/assets/images";
import Avatar from "@/shared/generics/Avatar";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import ExpendedIcon from "@/shared/generics/menu/icons/ExpendedIcon";
import Home2Icon from "@/shared/generics/menu/icons/Home2Icon";
import LocationIcon from "@/shared/generics/menu/icons/LocationIcon";
import OpenIcon from "@/shared/generics/menu/icons/OpenIcon";
import StarIcon from "@/shared/generics/menu/icons/StarIcon";
import { ModalEventKey } from "@/shared/helpers/hooks/ModalEventKey";
import { ModalEvents } from "@/shared/helpers/hooks/useModal";
import SpecializedServicesComponent from "../components/SpecializedServicesComponent";
import EditProfileView from "../edit/EditProfileView";
import useProfilView from "../../hooks/useProfilView";
import { LoadingState } from "@/shared/enums/LoadingState";
import Loader from "@/shared/generics/loader/Loader";

// check the model an write from scratch
const ProfileView = () => {
  const {
    state: {
      servicesCenterState,
      mySelfState: { myself, loading },
    },
  } = useProfilView();
  if (loading === LoadingState.pending)
    return (
      <div className="flex w-full justify-center my-32">
        <Loader />
      </div>
    );
  return (
    <div className="grid grid-cols-[auto_360px] gap-x-6">
      <div className="flex flex-col gap-y-6 overflow-y-auto h-[calc(100vh-80px)]">
        <img
          className="w-full h-[250px] rounded-[20px] object-cover"
          // need some check
          src={myself?.profileImage?.container}
          alt={myself?.name}
        />
        <div>
          <Avatar name="" />
          <div className="flex items-end justify-between mt-4">
            <div>
              <h2>Sample Autoshop</h2>
              <div className="flex items-center gap-x-4 text-primary">
                <div className="flex items-center gap-x-2">
                  <LocationIcon />
                  <span>Deido, Douala</span>
                </div>
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="flex items-center gap-x-2">
                  <StarIcon />
                  <span>4.75</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <PrimaryButton
                onClick={() => ModalEvents.open(ModalEventKey.EDIT_PROFILE)}
                className="border border-black h-10 rounded-full font-normal bg-transparent text-black text-sm"
              >
                Edit Profile
              </PrimaryButton>
              <PrimaryButton className="border border-black h-10 rounded-full font-normal bg-transparent text-black text-sm">
                Settings
              </PrimaryButton>
            </div>
          </div>
          <p className="mt-6 max-w-[340px]">
            Experience top-notch service at Japtech Auto shop, where we offer a
            wide range of basic car services to keep your vehicle running
            smoothly.
          </p>
        </div>
        <div className="flex flex-col gap-y-3">
          <h2 className="font-medium">Gallery</h2>
          <div className="flex flex-row overflow-x-auto w-full">
            {[IMAGES.car2, IMAGES.car2, IMAGES.car2, IMAGES.car2].map(
              (image, index) => {
                return (
                  <img
                    className="w-[150px] h-[150px] rounded-[20px] mr-3"
                    key={"image-" + index}
                    src={image}
                    alt=""
                  />
                );
              }
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <h2 className="font-medium">Specialized Services</h2>
          <div className="flex flex-row overflow-x-auto w-full">
            {servicesCenterState.servicesCenter?.map((s, index) => {
              return (
                <SpecializedServicesComponent
                  className=""
                  key={"service-" + index}
                  image={s.image}
                  title={s.id}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div className="bg-map bg-cover bg-center w-full h-[260px] rounded-xl p-2 relative flex items-center justify-center">
            <div className="flex justify-end items-center gap-x-2 absolute right-2 top-2">
              <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <ExpendedIcon />
              </button>
              <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <OpenIcon />
              </button>
            </div>
            <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full text-white">
              <Home2Icon />
            </div>
          </div>
        </div>
      </div>
      <EditProfileView />
    </div>
  );
};

export default ProfileView;
