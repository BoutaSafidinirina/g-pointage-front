import { Button, Flex, Icon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer(props: any) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageWidth, setPageWidth] = useState(0);
    const [fileExtension, setFileExtension] = useState<string | null>(null);

    useEffect(() => {
        const urlParts = props.url.split('.');
        const extension = urlParts[urlParts.length - 1].toLowerCase();
        setFileExtension(extension);
        setLoading(false);
    }, [props.url]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
        setLoading(false);
    }

    function onPageLoadSuccess() {
        setPageWidth(window.innerWidth);
    }

    function goToNextPage() {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }

    function goToPreviousPage() {
        setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }

    return (
        <div>
            {fileExtension && (
                <>
                    {fileExtension === 'pdf' ? (
                        <>
                            {loading ? (
                                <p>Chargement du PDF...</p>
                            ) : (
                                <>
                                    <Document
                                        file={`http://127.0.0.1:3001/${props.url}`}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        onSourceError={(err) => console.log(err)}
                                        onSourceSuccess={() => console.log("SUCCESS")}
                                        onLoadError={()=>console.log("ERR")}
                                                                >
                                        <Page
                                            pageNumber={pageNumber}
                                            onLoadSuccess={onPageLoadSuccess}
                                            width={Math.max(pageWidth * 0.6, 390)}
                                        />
                                    </Document>
                                    
                                    <Flex w={"100%"} alignItems={"center"} justifyContent={"space-between"}>
                                        <Button bg={"gray.300"} isDisabled={pageNumber === 1} onClick={goToPreviousPage} mx={'10px'} fontSize='sm' fontWeight='500' color={"secondaryGray.300"} borderRadius='7px'>
                                            <Icon as={FaChevronLeft} color={"#fff"} me='4px' />
                                        </Button>
                                        <Button bg={"gray.300"} isDisabled={pageNumber === numPages} onClick={goToNextPage} mx={'10px'} fontSize='sm' fontWeight='500' color={"secondaryGray.300"} borderRadius='7px'>
                                            <Icon as={FaChevronRight} color={"#fff"} me='4px' />
                                        </Button>
                                    </Flex>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <img src={`http://127.0.0.1:3001/${props.url}`} alt="Image" />
                        </>
                    )}
                </>
            )}
        </div>
    );
}
