import {
    TwitterShareButton,
    FacebookShareButton,
    WhatsappShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon, 
  } from "react-share";
  import * as A from 'components/adminImports';

const Share = () => {

    const router = A.useRouter();
    const APP_URL = process.env.APP_URL;
    return (
        <>
            <div className="share-buttons">
            <div>
                Share this ad
            </div>
                <div>
                    <WhatsappShareButton url={`${APP_URL}/${router.asPath}`}>
                        <WhatsappIcon size={32}/>
                    </WhatsappShareButton>
                </div>
                <div>
                   <FacebookShareButton url={`${APP_URL}/${router.asPath}`}>
                    <FacebookIcon size={32}/>
                   </FacebookShareButton>
                </div>
                <div>
                    <TwitterShareButton url={`${APP_URL}/${router.asPath}`}>
                        <TwitterIcon size={32}/>
                    </TwitterShareButton>
                </div>
            </div>
            <style jsx>
                {`
                .share-buttons{
                    display: flex;
                    justify-content: flex-end;
                }

                .share-buttons div{
                    margin: 10px;
                }
                `}
            </style>
        </>
    )
}


export default Share;