import { useUI } from "@contexts/ui.context";
import Modal from "./modal";
import dynamic from "next/dynamic";
import Newsletter from "../newsletter";
const LoginForm = dynamic(() => import("@components/auth/login-form"));
const SignUpForm = dynamic(() => import("@components/auth/sign-up-form"));
const ForgetPasswordForm = dynamic(
	() => import("@components/auth/forget-password-form")
);
const ProductPopup = dynamic(() => import("@components/product/product-popup"));
const ReviewPopup = dynamic(() => import("@components/product-review/product_Review-form"));
const InquiryPopup = dynamic(() => import("@components/Inquiry/productInquiry"));
const AppointmentPopup = dynamic(() => import("@components/appointment/Appointment_popup"));
const ManagedModal: React.FC = () => {
	const { displayModal, closeModal, modalView } = useUI();
	return (
		<Modal open={displayModal} onClose={closeModal}>
			{modalView === "LOGIN_VIEW" && <LoginForm />}
			{modalView === "SIGN_UP_VIEW" && <SignUpForm />}
			{modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />}
			{modalView === "PRODUCT_VIEW" && <ProductPopup />}
			{modalView === "NEWSLETTER_VIEW" && <Newsletter />}
			{modalView === "REVIEW" && <ReviewPopup />}
			{modalView === "INQUIRY" && <InquiryPopup />}
			{modalView === "APPOINTMENT" && <AppointmentPopup />}
		</Modal>
	);
};

export default ManagedModal;
