/* eslint-disable @typescript-eslint/no-explicit-any */
import LocationIcon from "@/assets/icons/LocationIcon";
import StarIcon from "@/assets/icons/StarIcon";
import images from "@/assets/images";
import Avatar from "@/components/avatar/Avatar.component";
import Button from "@/components/button/Button.component";
import Drawer from "@/components/drawer/Drawer.component";
import EditProfile from "@/components/edit-profile/EditProfile.component";
import Modal from "@/components/modals/Modal.component";
import Skeleton from "@/components/skeletons/Skeleton.component";
import { serviceImage } from "@/constants";
import { useToast } from "@/context/ToastContext";
import { ToastType } from "@/enums";
import DashboardLayout from '@/layouts/DashboardLayout';
import {
  useAddServiceCenterMediaMutation,
  useGetServiceCenterServicesQuery,
  useGetServiceCentersMutation,
} from "@/redux/api";
import { useAppSelector } from "@/redux/store";
import { paths } from "@/routes/paths";
import { Image } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Profile = () => {
  const [editOpen, setEditOpen] = useState(false);
  const { user_info } = useAppSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [getServiceCenters, { data, isLoading }] =
    useGetServiceCentersMutation();
  const { data: serviceCenterServices } = useGetServiceCenterServicesQuery(
    data?.data?.[0]?.id as string,
    {
      skip: !data?.data?.[0]?.id,
    }
  );
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
    getServiceCenters({
      ownerId: user_info?.userId,
    });
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
          toast(ToastType.SUCCESS, res?.meta?.message as string);
        })
        .catch((err) => {
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
    <DashboardLayout showBack={false}>
      <div className="grid grid-cols-[auto_360px] gap-x-6">
      {isLoading ? (
        <div className="flex-co space-y-8">
          <Skeleton paragraph={{ rows: 8 }} />
          <Skeleton paragraph={{ rows: 8 }} />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-y-6">
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
                <div
                  onClick={handleAddClick}
                  className="w-[150px] h-[150px] rounded-[20px] bg-primaryAccent flex items-center justify-center cursor-pointer hover:bg-white hover:border hover:border-primary transition-all duration-500"
                >
                  <span className="text-primary text-2xl">+</span>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex flex-col gap-y-3">
              <h2 className="font-medium">Specialized Services</h2>
              <div className="flex flex-row overflow-x-auto w-full">
                {serviceCenterServices?.data?.map((item) => {
                  return (
                    <div
                      className="w-[150px] h-[150px] rounded-2xl bg-primaryAccent mr-2 relative p-4 overflow-hidden"
                      key={item.id}
                    >
                      <h2 className="font-normal">{item?.service?.title}</h2>
                      <img
                        src={
                          serviceImage[
                            item.service.title as keyof typeof serviceImage
                          ].image
                        }
                        alt=""
                        className={twMerge(
                          "absolute -bottom-2 -right-0 object-contain"
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <>{/* <MapComponent /> */}</>
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
    </DashboardLayout>
  );
};

export default Profile;
