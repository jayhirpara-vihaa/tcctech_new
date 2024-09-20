import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Layout from "@components/layout/layout-mazzucchelli";
import Container from "@components/ui/container";
import { useTranslation } from "next-i18next";
import Divider from "@components/ui/divider";
import dynamic from "next/dynamic";
import { Fragment, useContext, useEffect, useState } from "react";
import { useCompanyInfoProductsQuery } from "src/framework/company-info/get-all-company-info";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import Router from "next/router";
import Button from "@components/ui/button";
import { useDropzone } from "react-dropzone";
import { MdNoteAdd } from "react-icons/md";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

interface FileProp {
    name: string;
    type: string;
    size: number;
}

export default function Product2() {
    const { t } = useTranslation("common");
    const [files, setFiles] = useState<File[]>([]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            setFiles(acceptedFiles.map((file: File) => Object.assign(file)));
        },
    });

    const { updateOnlineLogos } =
        useContext(CompanyInfoContext);
    const { data: CompanyInfoData } = useCompanyInfoProductsQuery();
    const webConfigBgColor = `linear-gradient(${process.env.NEXT_PUBLIC_MAZZCONFIG_BG_COLOR})`;

    useEffect(() => {
        //updateCompanyInfo(CompanyInfoData?.data.companyInfo);
        updateOnlineLogos(CompanyInfoData?.data.images);
    }, [CompanyInfoData]);


    const renderFilePreview = (file: FileProp) => {
        if (file.type.startsWith("image")) {
            return (
                <img
                    width={38}
                    height={38}
                    alt={file.name}
                    src={URL.createObjectURL(file as any)}
                />
            );
        } else {
            // return <Icon icon='tabler:file-description' />
        }
    };

    const handleRemoveFile = (file: FileProp) => {
        const uploadedFiles = files;
        const filtered = uploadedFiles.filter(
            (i: FileProp) => i.name !== file.name
        );
        setFiles([...filtered]);
    };

    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    const fileList = files.map((file: FileProp) => (
        <ListItem key={file.name}>
            <div className="file-details">
                <div className="file-preview">{renderFilePreview(file)}</div>
                <div>
                    <Typography className="file-name">{file.name}</Typography>
                    <Typography className="file-size" variant="body2">
                        {Math.round(file.size / 100) / 10 > 1000
                            ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                            : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                    </Typography>
                </div>
            </div>
            <IconButton onClick={() => handleRemoveFile(file)}>
                {/* <Icon icon="tabler:x" fontSize={20} /> */}
            </IconButton>
        </ListItem>
    ));


    return (
        <>
            <Container>
                <div className="py-16 lg:py-20 px-4 md:px-8 2xl:px-16">
                    <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
                        <div className="text-center mb-6 pt-2.5">
                            <h3 className="font-bold">Upload your image </h3>
                        </div>
                        <form
                            className="flex flex-col justify-center"
                            noValidate
                        >
                            <div className="flex flex-col space-y-4">

                                {/* <div className="file-preview">{renderFilePreview(file)}</div> */}

                                <div {...getRootProps({ className: "dropzone" })}>
                                    <input {...getInputProps()} />
                                    <div className="border border-gray-300 p-16 w-40 h-full">
                                        <span className="drop-zone__prompt">
                                            <MdNoteAdd size={25} />
                                        </span>
                                    </div>
                                </div>
                                {files.length ? (
                                    <Fragment>
                                        <List>{fileList}</List>

                                    </Fragment>
                                ) : null}

                                <div className="relative ml-2">
                                    <Button
                                        variant="slim"
                                        style={{ background: `${webConfigBgColor}` }}
                                        className={`w-100 md:w-100 rounded mb-16 lg:mb-0`}
                                    >
                                        <span className="py-2 3xl:px-8">UPLOAD</span>
                                    </Button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </Container>
        </>
    );
}

Product2.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                "common",
                "forms",
                "menu",
                "footer",
            ])),
        },
    };
};
