import BaseButton from "@/components/BaseButton";
import Dialog from "@/components/Dialog";
import TextArea from "@/components/TextArea";
import TextField from "@/components/TextField";
import { Form, Formik } from "formik";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { createFeedbackAPI } from "@/services/feedback";
import * as yup from "yup";
import { useLocales } from "@/hooks/useLanguage";

interface IFormValues {
  email?: string;
  desc: string;
}

const formKey = (key: keyof IFormValues) => key;

const FeedbackButton: React.FC<{}> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLocales(["common"]);

  const validationSchema = useMemo(
    () =>
      yup.object().shape<{ [k in keyof IFormValues]: any }>({
        email: yup.string().email(t("common.feedback.error.invalid-email")),
        desc: yup.string().required(t("common.required-field")),
      }),
    []
  );

  const [initValue] = useState<Required<IFormValues>>({
    email: "",
    desc: "",
  });

  const handleSubmit = async (values: IFormValues) => {
    setIsOpen(false);
    const id = toast.loading(t("common.feedback.sending"), {
      position: "bottom-left",
    });
    try {
      if (!values.email) delete values.email;
      await createFeedbackAPI(values);
    } catch (error) {}
  };

  return (
    <>
      <BaseButton onClick={() => setIsOpen(true)}>
        {t("common.feedback.title")}
      </BaseButton>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Header>{t("common.feedback.title")}</Dialog.Header>
        <p className="font-normal text-md text-gray">
          {t("common.feedback.sub-title")}
        </p>
        <Dialog.Content>
          <Formik
            validationSchema={validationSchema}
            initialValues={initValue}
            onSubmit={handleSubmit}
          >
            <Form>
              <TextField label="Email" name={formKey("email")} />
              <TextArea
                className="w-full text-md mt-1.5"
                name={formKey("desc")}
                label={t("common.feedback.desc")}
                style={{
                  maxHeight: "400px",
                  minHeight: "200px",
                  lineHeight: 1.3,
                }}
                required
              />
              <Dialog.ActionButtons onClose={() => setIsOpen(false)} />
            </Form>
          </Formik>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default FeedbackButton;
