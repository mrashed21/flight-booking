"use client";
import CommonButton from "@/components/UI/CommonButton";
import CountrySelect from "@/components/UI/CountrySelect";
import DepartureDateSelect from "@/components/UI/DepartureDateSelect";
import { BDPhoneInput } from "bd-number-validator";
import "bd-number-validator/react/style.css";
import { ScanQrCode } from "lucide-react";
import { Controller } from "react-hook-form";

const PassengerInfo = ({ countries, form }) => {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const gender = watch("gender");

  return (
    <>
      {/* passenger */}
      <section className="rounded-lg bg-white p-5 shadow-sm">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold lg:text-base">
            Passenger Adult (1)
          </h2>

          <button
            type="button"
            className="border-primary text-primary hover:bg-primary-soft flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition lg:text-sm"
          >
            <ScanQrCode className="size-3 lg:size-4" />
            Scan Passport
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* First Name */}
          <div>
            <label className="form-label">First Name</label>
            <input
              {...register("firstName", { required: true })}
              placeholder="Enter first "
              className="form-input name outline:none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="form-label">Last Name</label>
            <input
              {...register("lastName", { required: true })}
              placeholder="Enter last name"
              className="form-input"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DepartureDateSelect
                  {...field}
                  label={"Date of birth"}
                  className="bg-surface! border-none shadow-none!"
                />
              )}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="form-label">Gender</label>
            <div className="flex gap-2">
              {["male", "female"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setValue("gender", item)}
                  className={`flex-1 cursor-pointer rounded-md border py-2 text-sm transition ${
                    gender === item
                      ? "border-primary bg-primary text-white"
                      : "border-gray-light bg-surface text-muted"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="form-label">Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountrySelect
                  countries={countries}
                  placeholder="Select country"
                  {...field}
                />
              )}
            />
          </div>

          {/* Passport Number */}
          <div className="lg:col-span-2">
            <label className="form-label">Passport Number</label>
            <input
              {...register("passportNumber")}
              placeholder="Enter passport number"
              className="form-input"
            />
          </div>

          {/* Expire Date */}
          <div>
            <Controller
              name="expireDate"
              control={control}
              render={({ field }) => (
                <DepartureDateSelect
                  label="Expire Date"
                  {...field}
                  className="bg-surface! border-none shadow-none!"
                />
              )}
            />
          </div>
        </div>
      </section>
      {/* contact info  */}
      <div className="mt-5 rounded-lg bg-white p-5 shadow-sm">
        <h2 className="text-lg font-medium">Contact Information</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {/* email */}
          <div className="">
            <label className="form-label"> Email</label>
            <input
              className="form-input"
              placeholder="Enter you email"
              type="text"
            />
          </div>

          {/* phone */}
          <div className="">
            <BDPhoneInput
              // containerClass="form-input"
              wrapperClass="form-input flex gap-2"
              // flagClass="bdp-flag"
              // prefixClass="bdp-prefix"
              // inputClass="form-input"
              // labelClass="bdp-label"
              // errorClass="bdp-error-text"
            />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end">
          <CommonButton className="px-5! py-1.5! lg:px-10! lg:py-2!">
            Continue
          </CommonButton>
        </div>
      </div>
    </>
  );
};

export default PassengerInfo;
