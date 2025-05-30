/* eslint-disable @typescript-eslint/no-explicit-any */
import ExpendedIcon from "@/assets/icons/ExpendedIcon";
import Home2Icon from "@/assets/icons/Home2Icon";
import LocationIcon from "@/assets/icons/LocationIcon";
import OpenIcon from "@/assets/icons/OpenIcon";
import StarIcon from "@/assets/icons/StarIcon";
import images from "@/assets/images";
import Avatar from "@/components/avatar/Avatar.component";
import Button from "@/components/button/Button.component";
import Drawer from "@/components/drawer/Drawer.component";
import EditProfile from "@/components/edit-profile/EditProfile.component";
import Modal from "@/components/modals/Modal.component";
import Skeleton from "@/components/skeletons/Skeleton.component";
import { useToast } from "@/context/ToastContext";
import { ToastType } from "@/enums";
import {
  useAddServiceCenterMediaMutation,
  useGetServiceCentersMutation,
} from "@/redux/api";
import { useAppSelector } from "@/redux/store";
import { paths } from "@/routes/paths";
import { Image } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [editOpen, setEditOpen] = useState(false);
  const { user_info } = useAppSelector((state) => state.auth);
  const request = {
    ownerId: user_info?.userId,
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [getServiceCenters, { data, isLoading }] =
    useGetServiceCentersMutation();
  const [addMedia, { isLoading: addLoading }] =
    useAddServiceCenterMediaMutation();
  const { toast } = useToast();

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Open file selector
  const handleAddClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Preview selected image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(imageUrl);
    setIsModalVisible(true);
  };

  useEffect(() => {
    getServiceCenters(request);
  }, []);

  const center = data?.data?.[0];

  const handleAddMediaImage = () => {
    if (data?.data?.[0]?.id) {
      const formData = new FormData();
      formData.append("file", selectedFile as any);
      const req = {
        id: data?.data?.[0]?.id,
        data: formData,
      };
      addMedia(req)
        .unwrap()
        .then((res) => {
          console.log(res);
          toast(ToastType.SUCCESS, res?.meta?.message as string);
        })
        .catch((err) => {
          console.log("err", err);
          if (err?.data?.errors) {
            toast(ToastType.ERROR, err?.data?.errors);
          } else if (err?.message) {
            toast(ToastType.ERROR, err?.message);
          } else {
            toast(ToastType.ERROR, "update failed!");
          }
        });
    }
  };

  const clearModal = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setIsModalVisible(false);
  };

  return (
    <div className="grid grid-cols-[auto_360px] gap-x-6">
      {isLoading ? (
        <div className="flex-co space-y-8">
          <Skeleton paragraph={{ rows: 8 }} />
          <Skeleton paragraph={{ rows: 8 }} />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-y-6 overflow-y-auto h-[calc(100vh-80px)]">
            <img
              className="w-full h-[250px] rounded-[20px] object-cover"
              // need some check
              src={center?.imageUrl ?? images.logo}
            />
            <div>
              <div className="flex-row justify-between flex">
                <Avatar name={center?.name} />

                <div className="flex items-center gap-x-4 mr-7">
                  <Button
                    onClick={() => setEditOpen(true)}
                    className=" rounded-full h-[40px] px-5 text-sm"
                    variant="tertiary"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    onClick={() => navigate(paths.settings)}
                    className=" rounded-full h-[40px] px-5 text-sm"
                    variant="tertiary"
                  >
                    Settings
                  </Button>
                </div>
              </div>
              <div className="flex items-end justify-between mt-4">
                <div>
                  <h2>{center?.category}</h2>
                  <div className="flex items-center gap-x-4 text-primary">
                    <div className="flex items-center gap-x-2">
                      <LocationIcon />
                      <span>{center?.location?.name}</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    <div className="flex items-center gap-x-2">
                      <StarIcon />
                      <span>4.75</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-6">{center?.location?.description}</p>
            </div>
            <div className="flex flex-col gap-y-3">
              <h2 className="font-medium">Gallery</h2>
              <div className="flex flex-row overflow-x-auto w-full">
                {/* {[images.car2, images.car2, images.car2].map((image, index) => {
              return (
                <img
                  className="w-[150px] h-[150px] rounded-[20px] mr-3"
                  key={"image-" + index}
                  src={image}
                  alt=""
                />
              );
            })} */}
                <div
                  onClick={handleAddClick}
                  className="w-[150px] h-[150px] rounded-[20px] bg-primaryAccent flex items-center justify-center cursor-pointer hover:bg-white hover:border hover:border-primary transition-all duration-500"
                >
                  <span className="text-primary text-2xl">+</span>
                </div>
              </div>
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Preview Modal */}
            </div>

            <div className="flex flex-col gap-y-3">
              <h2 className="font-medium">Specialized Services</h2>
              {/* <div className="flex flex-row overflow-x-auto w-full">
            {servicesCenterState.servicesCenter?.map((item, index) => {
              return (
                <div className="w-[122px] h-[140px] rounded-2xl bg-primaryAccent mr-2 relative p-4 overflow-hidden">
                  <h2 className="font-normal">{item?.title}</h2>
                  <img
                    src={item?.image}
                    alt=""
                    className={twMerge(
                      "absolute -bottom-2 -right-0 object-contain"
                    )}
                  />
                </div>
              );
            })}
          </div> */}
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
        </>
      )}
      <Drawer
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Profile"
      >
        {center && (
          <EditProfile {...center} onRequested={() => setEditOpen(false)} />
        )}
      </Drawer>
      <Modal
        open={isModalVisible}
        onCancel={clearModal}
        footer={[
          <div className="flex justify-end space-x-3">
            <Button key="cancel" variant="tertiary" onClick={clearModal}>
              Cancel
            </Button>
            ,
            <Button
              key="upload"
              variant="secondary"
              onClick={handleAddMediaImage}
              disabled={!selectedFile}
              isLoading={addLoading}
            >
              Add Media
            </Button>
          </div>,
        ]}
      >
        {previewUrl && (
          <div className="w-full h-full flex justify-center items-center">
            (
            <Image
              src={previewUrl}
              height={500}
              alt="Preview"
              preview={false}
            />
            )
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Profile;
