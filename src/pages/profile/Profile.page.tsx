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
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useAddServiceCenterMediaMutation,
  useGetServiceCenterQuery,
  useGetServiceCenterServicesQuery,
} from "@/redux/api";
import { useAppSelector } from "@/redux/store";
import { paths } from "@/routes/paths";
import { Skeleton as AntdSkeleton, Image } from "antd";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Profile = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { serviceCenterId } = useAppSelector((state) => state.auth);
  const {
    data: data,
    isLoading,
    refetch,
  } = useGetServiceCenterQuery(serviceCenterId, {
    skip: !serviceCenterId,
  });
  const { data: serviceCenterServices } = useGetServiceCenterServicesQuery(
    data?.data?.id as string,
    {
      skip: !data?.data?.id,
    }
  );
  const [addMedia, { isLoading: addLoading }] =
    useAddServiceCenterMediaMutation();
  const { toast } = useToast();

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const center = data?.data;
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

  const handleAddMediaImage = () => {
    if (data?.data?.id) {
      const formData = new FormData();
      formData.append("file", selectedFile as any);
      const req = {
        id: data?.data?.id,
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
  console.log(serviceCenterServices?.data);
  return (
    <DashboardLayout showBack={false}>
      <div className="grid grid-cols-[auto_360px] gap-x-6">
        <>
          <div className="flex flex-col gap-y-6">
            {isLoading ? (
              <Skeleton paragraph={{ rows: 8 }} />
            ) : (
              <img
                className="w-full h-[250px] p-8 rounded-[20px] border border-gray-100 object-contain"
                // need some check
                src={images.logo}
              />
              // <img
              //   className="w-full h-[250px] rounded-[20px] object-cover"
              //   // need some check
              //   src={data?.data?.imageUrl ?? images.logo}
              // />
            )}
            <div>
              <div className="flex-row justify-between flex">
                {isLoading ? (
                  <div className="flex flex-row">
                    <AntdSkeleton.Avatar active size={50} shape="circle" />
                  </div>
                ) : (
                  <Avatar name={data?.data?.name} nameClassName="text-lg" />
                )}
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
                  <h2 className='mb-1'>{data?.data?.category}</h2>
                  <div className="flex items-center gap-x-4 text-primary">
                    <div className="flex items-center gap-x-2">
                      <LocationIcon size={20} />
                      <span>{data?.data?.location?.name}</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    <div className="flex items-center gap-x-2">
                      <StarIcon />
                      <span>4.75</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-6">{data?.data?.location?.description}</p>
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
                {serviceCenterServices?.data &&
                  serviceCenterServices?.data?.map((item, index) => {
                    return (
                      <div
                        className="w-auto h-[150px] rounded-2xl bg-primaryAccent mr-2 relative p-4 overflow-hidden"
                        key={item.id}
                      >
                        <h2 className="font-normal">{item?.service?.title}</h2>
                        <div className="flex space-x-4 mt-1">
                          <div className="flex text-sm text-primaryAccent2 space-x-1 items-center">
                            <span className="text-gray-400">Duration:</span>
                            <span>{item?.durationMinutes} Mins</span>
                          </div>
                          <div className="flex text-sm text-primaryAccent2 space-x-1 items-center">
                            <span className="text-gray-400">Price:</span>
                            <span>{item?.price}</span>
                          </div>
                          <div className="flex text-sm text-primaryAccent2 space-x-1 items-center">
                            <span className="text-gray-400">Available:</span>
                            <div
                              className={twMerge(
                                "w-2 h-2 bg-green-400 rounded-full",
                                !item?.available && "bg-red-400"
                              )}
                            />
                          </div>
                        </div>
                        <img
                          src={serviceImage?.[index]}
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
        <Drawer
          open={editOpen}
          onClose={() => setEditOpen(false)}
          title="Edit Profile"
        >
          {data?.data && (
            <EditProfile
              onRequested={refetch}
              serviceCenterId={serviceCenterId}
              {...center}
            />
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
