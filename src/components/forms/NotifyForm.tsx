"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import WaitlistModal from "../modal/WaitlistModal";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface WaitlistResponse {
  position: number;
  referralLink: string;
  referralCount: number;
  leaderBoard: Array<{
    rank: number;
    userId: string;
    referrals: number;
  }>;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

// const notifyUser = async (email: string) => {
//   try {
//     const res = await axios.post(`${baseUrl}/api/v1/subscriber/subscribe`, {
//       email,
//     });

//     if (res.status === 200) {
//       toast.success(res.data.message);
//       if (typeof window !== "undefined") {
//         window.location.replace(res.data.data.link);
//       }
//     } else {
//       toast.error("Failed to subscribe. Please try again.");
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // Handle Axios errors
//       toast.error(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//     } else {
//       // Handle non-Axios errors
//       toast.error("An unexpected error occurred. Please try again.");
//     }
//   }
// };

export default function NotifyMeForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waitlistData, setWaitlistData] = useState<WaitlistResponse | null>(
    null
  );

  const notifyUser = async (email: string) => {
    setIsModalOpen(true);
    setWaitlistData({
      position: 4,
      referralLink: "321",
      referralCount: 18,
      leaderBoard: [
        {
          rank: 1,
          userId: "de21",
          referrals: 7,
        },
        {
          rank: 2,
          userId: "11w3e",
          referrals: 5,
        },
        {
          rank: 3,
          userId: "11w3e",
          referrals: 3,
        },
        {
          rank: 4,
          userId: "w3ewq",
          referrals: 1,
        },
        {
            rank: 1,
            userId: "de21",
            referrals: 7,
          },
          {
            rank: 2,
            userId: "11w3e",
            referrals: 5,
          },
          {
            rank: 3,
            userId: "11w3e",
            referrals: 3,
          },
          {
            rank: 4,
            userId: "w3ewq",
            referrals: 1,
          },
          {
            rank: 1,
            userId: "de21",
            referrals: 7,
          },
          {
            rank: 2,
            userId: "11w3e",
            referrals: 5,
          },
          {
            rank: 3,
            userId: "11w3e",
            referrals: 3,
          },
          {
            rank: 4,
            userId: "w3ewq",
            referrals: 1,
          },
      ],
    });
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          notifyUser(values.email);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="  w-full">
            <div className=" flex flex-col sm:flex-row gap-3 w-full md:w-10/12 ">
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="focus:outline-none focus:ring-0 focus:ring-none border border-white text-white bg-[#5386E4]  px-4 py-[11px] md:py-4 text-base rounded-full w-full placeholder-white"
              />

              <button
                type="submit"
                className="whitespace-nowrap bg-white text-[#5386E4] text-base px-[30px] md:px-[52px] py-[11px] md:py-4 rounded-full w-full sm:w-[196px]"
                disabled={isSubmitting}
              >
                Join Waitlist
              </button>
            </div>

            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-[12px] md:text-sm mt-1"
            />
          </Form>
        )}
      </Formik>

      {isModalOpen && waitlistData && (
        <WaitlistModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          position={waitlistData.position}
          referralLink={waitlistData.referralLink}
          referralCount={waitlistData.referralCount}
          leaderBoard={waitlistData.leaderBoard}
        />
      )}
    </div>
  );
}
