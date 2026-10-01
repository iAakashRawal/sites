"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters")
      .regex(/^[A-Za-z ]+$/, "Only letters are allowed"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters")
      .regex(/^[A-Za-z ]+$/, "Only letters are allowed"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),

    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

    confirmPassword: z.string(),

    age: z
      .coerce
      .number()
      .min(18, "You must be at least 18 years old")
      .max(100, "Age cannot exceed 100"),

    gender: z.enum(["male", "female", "other"], {
      message: "Please select your gender",
    }),

    country: z.string().min(1, "Please select a country"),

    website: z
      .string()
      .url("Enter a valid URL")
      .optional()
      .or(z.literal("")),

    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required"),

    address: z
      .string()
      .min(10, "Address must be at least 10 characters")
      .max(200, "Address cannot exceed 200 characters"),

    city: z
      .string()
      .min(2, "City is required")
      .max(50, "City name is too long"),

    pincode: z
      .string()
      .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit pincode"),

    terms: z.literal(true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      age: undefined,
      gender: undefined,
      country: "",
      website: "",
      dateOfBirth: "",
      address: "",
      city: "",
      pincode: "",
      terms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("FORM DATA:", data);

    // API call
    // await fetch("/api/register", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });

    alert("Form submitted successfully!");
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg md:p-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Registration Form
          </h1>

          <p className="mt-2 text-gray-500">
            Fill all required fields carefully.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* PERSONAL INFORMATION */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              Personal Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* First Name */}
              <Field label="First Name" error={errors.firstName?.message}>
                <input
                  {...register("firstName")}
                  placeholder="John"
                  className="input"
                />
              </Field>

              {/* Last Name */}
              <Field label="Last Name" error={errors.lastName?.message}>
                <input
                  {...register("lastName")}
                  placeholder="Doe"
                  className="input"
                />
              </Field>

              {/* Email */}
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className="input"
                />
              </Field>

              {/* Phone */}
              <Field label="Phone" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  className="input"
                />
              </Field>

              {/* Age */}
              <Field label="Age" error={errors.age?.message}>
                <input
                  {...register("age")}
                  type="number"
                  placeholder="25"
                  className="input"
                />
              </Field>

              {/* DOB */}
              <Field
                label="Date of Birth"
                error={errors.dateOfBirth?.message}
              >
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  className="input"
                />
              </Field>

            </div>
          </section>

          {/* ACCOUNT INFORMATION */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              Account Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Password */}
              <Field label="Password" error={errors.password?.message}>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="********"
                  className="input"
                />
              </Field>

              {/* Confirm Password */}
              <Field
                label="Confirm Password"
                error={errors.confirmPassword?.message}
              >
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="********"
                  className="input"
                />
              </Field>

            </div>
          </section>

          {/* GENDER */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              Gender
            </h2>

            <div className="flex flex-wrap gap-6">

              {["male", "female", "other"].map((gender) => (
                <label
                  key={gender}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    {...register("gender")}
                    type="radio"
                    value={gender}
                  />

                  <span className="capitalize">
                    {gender}
                  </span>
                </label>
              ))}

            </div>

            {errors.gender && (
              <p className="mt-2 text-sm text-red-500">
                {errors.gender.message}
              </p>
            )}
          </section>

          {/* ADDRESS */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">
              Address
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Country */}
              <Field label="Country" error={errors.country?.message}>
                <select
                  {...register("country")}
                  className="input"
                >
                  <option value="">Select country</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                </select>
              </Field>

              {/* City */}
              <Field label="City" error={errors.city?.message}>
                <input
                  {...register("city")}
                  placeholder="Bhopal"
                  className="input"
                />
              </Field>

              {/* Pincode */}
              <Field label="Pincode" error={errors.pincode?.message}>
                <input
                  {...register("pincode")}
                  maxLength={6}
                  placeholder="462001"
                  className="input"
                />
              </Field>

              {/* Website */}
              <Field label="Website" error={errors.website?.message}>
                <input
                  {...register("website")}
                  type="url"
                  placeholder="https://example.com"
                  className="input"
                />
              </Field>

            </div>

            {/* Address */}
            <div className="mt-5">
              <Field label="Full Address" error={errors.address?.message}>
                <textarea
                  {...register("address")}
                  rows={4}
                  placeholder="Enter your complete address..."
                  className="input resize-none"
                />
              </Field>
            </div>

          </section>

          {/* TERMS */}
          <section>

            <label className="flex cursor-pointer items-start gap-3">

              <input
                {...register("terms")}
                type="checkbox"
                className="mt-1"
              />

              <span className="text-sm text-gray-600">
                I agree to the Terms & Conditions and Privacy Policy.
              </span>

            </label>

            {errors.terms && (
              <p className="mt-2 text-sm text-red-500">
                {errors.terms.message}
              </p>
            )}

          </section>

          {/* BUTTONS */}
          <div className="flex gap-4 border-t pt-6">

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="rounded-lg border px-6 py-3 font-medium hover:bg-gray-50"
            >
              Reset
            </button>

          </div>

        </form>
      </div>

      {/* Tailwind utility */}
      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 10px 12px;
          outline: none;
          transition: 0.2s;
        }

        .input:focus {
          border-color: #000;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  );
}

/* Reusable Field Component */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
