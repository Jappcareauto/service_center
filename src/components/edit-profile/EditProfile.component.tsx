/* eslint-disable @typescript-eslint/no-explicit-any */
import ExpendedIcon from "@/assets/icons/ExpendedIcon";
import Home2Icon from "@/assets/icons/Home2Icon";
import OpenIcon from "@/assets/icons/OpenIcon";
import images from "@/assets/images";
import { useToast } from "@/context/ToastContext";
import { ToastType } from "@/enums";
import {
  useUpdateServiceCenterImageMutation,
  useUpdateServiceCenterMutation,
} from "@/redux/api";
import { ServiceCenter } from "@/types";
import { Input as AntdInput } from "antd";
import { FC, useState } from "react";
import Avatar from "../avatar/Avatar.component";
import Button from "../button/Button.component";
import Input from "../inputs/Input.component";

interface IProps extends ServiceCenter {
  onRequested?: () => void;
}

const EditProfile: FC<IProps> = ({ onRequested, ...props }) => {
  const [updateServiceCenter, { isLoading }] = useUpdateServiceCenterMutation();
  const [updateImage, { isLoading: imageUpdateLoading }] =
    useUpdateServiceCenterImageMutation();
  const { toast } = useToast();
  const [name, setName] = useState(props.name ?? "");
  const [locName, setLocName] = useState(props?.location?.name ?? "");
  const [locDescription, setLocDescription] = useState(
    props.location?.description ?? ""
  );

  const handleUpdateImage = (file: any) => {
    if (props.id) {
      const formData = new FormData();
      formData.append("file", file);
      const data = {
        id: props.id,
        data: formData,
      };
      updateImage(data)
        .unwrap()
        .then((res) => {
          onRequested?.();
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
  const handleUpdateServiceCenter = () => {
    if (props.id) {
      const updatedData = {
        ...props,
        name,
        location: {
          ...props.location,
          name: locName,
          description: locDescription,
        },
      };
      const data = {
        id: props.id,
        data: updatedData,
      };
      updateServiceCenter(data)
        .unwrap()
        .then((res) => {
          toast(ToastType.SUCCESS, res?.meta?.message as string);
          onRequested?.();
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

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="relative">
          <Avatar
            parentClassName="w-[120px] h-[120px]"
            className="border-[4px] p-1"
            profileImageUrl={props.imageUrl ? props.imageUrl : images.logo}
            id="profile"
            allowUpload
            onSelect={(file) => {
              handleUpdateImage(file);
            }}
            isLoading={imageUpdateLoading}
            showEdit={true}
          />
          {/* <button className="absolute bottom-1 right-1 rounded-full flex items-center justify-center bg-primary w-9 h-9">
            <EditIcon />
          </button> */}
        </div>
      </div>
      <div className="flex flex-col gap-y-5 mt-5">
        <div>
          <Input
            value={name}
            placeholder="service center name"
            onChange={(e) => setName(e.target.value)}
            label="Serive Center Name"
          />
        </div>
        <div>
          <p className="mb-2 text-sm">Description</p>
          <AntdInput.TextArea
            rows={5}
            placeholder="Our vehicle service center in Yaoundé, Cameroon offers professional automotive care tailored to keep your car running smoothly and reliably"
          />
        </div>
        <div>
          <div className="mb-3 text-gray-400">Service Center Location</div>
          <div className="flex-col flex gap-y-4">
            <div>
              <Input
                label="Address"
                placeholder="e.g Deido, Douala"
                value={locName}
                onChange={(e) => setLocName(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-2 text-sm">Description</p>
              <AntdInput.TextArea
                rows={3}
                placeholder="Found at Younde cameroon near brasseries."
                value={locDescription}
                onChange={(e) => setLocDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <Button variant="tertiary" className="text-sm rounded-full my-2">
            Select from Map
          </Button>
        </div>
        <div>
        {/* <MapWithMarker /> */}
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
      <Button
        isLoading={isLoading}
        className="w-full mt-10"
        onClick={handleUpdateServiceCenter}
      >
        Update Profile
      </Button>
    </div>
  );
};

export default EditProfile;
