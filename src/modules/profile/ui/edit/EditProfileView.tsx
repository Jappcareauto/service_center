import Avatar from "@/shared/generics/Avatar";
import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import Input from "@/shared/generics/inputs/Input";
import InputTextArea from "@/shared/generics/inputs/InputTextArea";
import EditIcon from "@/shared/generics/menu/icons/EditIcon";
import { RightModal } from "@/shared/generics/modals/RightModal";
import { ModalEventKey } from "@/shared/helpers/hooks/ModalEventKey";
import { useModal } from "@/shared/helpers/hooks/useModal";

const EditProfileView = () => {
  const modal = useModal({
    eventName: ModalEventKey.EDIT_PROFILE,
  });

  return (
    <RightModal
      isOpen={modal.isOpen}
      close={modal.close}
      className="pt-[72px] px-6"
    >
      <h2 className="font-medium mb-5">Edit profile</h2>
      <div className="w-full flex justify-center items-center">
        <div className="relative">
          <Avatar
            className="w-[120px] h-[120px]"
            parentClassName="border-[4px] p-1"
          />
          <button className="absolute bottom-1 right-1 rounded-full flex items-center justify-center bg-primary w-9 h-9">
            <EditIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-5 mt-5">
        <InputTextArea
          label="Description"
          placeholder="Experience top-notch service at Japtech Auto shop, where we offer a wide range of basic car services to keep your vehicle running smoothly."
        />
        <Input
          label="Address"
          placeholder="e.g Deido, Douala"
        />
        <div>
          <label htmlFor="" className='mb-2 block'>Location</label>
          <div className="flex items-center gap-x-3">
            <Input
              placeholder="Lat"
            />
            <Input
              placeholder="Long"
            />
          </div>
        </div>
        <div>
          <PrimaryButton
            className="border border-black h-10 rounded-full font-normal bg-transparent text-black text-sm"
          >
            Select from Map
          </PrimaryButton>
        </div>
      </div>
      <div className="bg-background p-6 fixed bottom-0 left-0 right-0 w-full">
        <PrimaryButton className="w-full">
          Save
        </PrimaryButton>
      </div>
    </RightModal>
  )
}

export default EditProfileView
