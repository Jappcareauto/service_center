/* eslint-disable @typescript-eslint/no-explicit-any */
import LocationIcon from "@/assets/icons/LocationIcon";
import StarIcon from "@/assets/icons/StarIcon";
import images from "@/assets/images";
import Avatar from "@/components/avatar/Avatar.component";
import Button from "@/components/button/Button.component";
import CategoryCard from "@/components/category-card/CategoryCard.component";
import Drawer from "@/components/drawer/Drawer.component";
import EditProfile from "@/components/edit-profile/EditProfile.component";
import Modal from "@/components/modals/Modal.component";
import ServiceCard from '@/components/service-card/ServiceCard.component';
import Skeleton from "@/components/skeletons/Skeleton.component";
import { useToast } from "@/context/ToastContext";
import { ToastType } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useAddServiceCenterMediaMutation,
  useGetServiceCenterCategoriesQuery,
  useGetServiceCenterQuery,
  useGetServiceCenterServicesQuery,
} from "@/redux/api";
import { useAppSelector } from "@/redux/store";
import { paths } from "@/routes/paths";
import { Skeleton as AntdSkeleton, Image } from "antd";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const { data: serviceCenterServices } =
    useGetServiceCenterServicesQuery(undefined);
  const { data: serviceCenterCategories } =
    useGetServiceCenterCategoriesQuery(undefined);
  const [addMedia, { isLoading: addLoading }] =
    useAddServiceCenterMediaMutation();
  const { toast } = useToast();

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  console.log("serviceCenterCategories", serviceCenterCategories);
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
          console.log("res", res);
          toast(ToastType.SUCCESS, res?.meta?.message as string);
          clearModal();
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
        <>
          <div className="flex flex-col gap-y-6">
            <div className="w-full h-[200px] rounded-[20px] flex justify-center items-center bg-primaryAccent  border border-gray-100">
              {isLoading ? (
                <Skeleton paragraph={{ rows: 8 }} />
              ) : (
                <img
                  className="w-full h-full object-contain"
                  src={data?.data?.imageUrl || images?.logo}
                />
              )}
            </div>
            <div>
              <div className="flex-row justify-between flex">
                {isLoading ? (
                  <div className="flex flex-row">
                    <AntdSkeleton.Avatar active size={50} shape="circle" />
                  </div>
                ) : (
                  <Avatar name={data?.data?.name} nameClassName="text-lg" />
                )}
                <div className="flex items-center gap-x-4 ">
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
              {isLoading ? (
                <div className="mt-4">
                  <AntdSkeleton.Input
                    active
                    style={{ width: 200, height: 20 }}
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <h2 className="mb-1">{data?.data?.category}</h2>
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
                </>
              )}
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
              <div className="flex flex-row overflow-x-auto gap-4 w-full">
                {serviceCenterServices?.data &&
                  serviceCenterServices?.data?.map((item) => {
                    return (
                      <ServiceCard key={item?.title} {...item} />
                    );
                  })}
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <h2 className="font-medium">All Categories</h2>
              <div className="flex flex-row overflow-x-auto gap-4 w-full">
                {serviceCenterCategories?.data &&
                  serviceCenterCategories?.data?.map((item) => {
                    return <CategoryCard key={item?.code} {...item} />;
                  })}
              </div>
            </div>
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
