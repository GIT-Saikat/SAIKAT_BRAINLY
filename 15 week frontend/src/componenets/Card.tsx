
import { ShareIcon } from "../icons/share";
import YouTubeEmbed from 'react-youtube-embed'
import { TwitterTweetEmbed } from 'react-twitter-embed';


interface CardProps{
    title:string,
    link:string,
    type:"twitter" | "youtube";
}


export function Card({title,link,type}:CardProps) {

    return <div>
        <div className="p-4 bg-white rounded-md shadow-md  border-gray-200 max-w-72  border">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500  pr-2">
                        <ShareIcon />
                    </div>
                    {title}
                </div>
                <div className="flex  items-center">

                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>
                        
                    </div>
                    
                    <div className="text-gray-500">
                        <ShareIcon />
                    </div>

                </div>
            </div>
            <div className="pt-4">
                {/* {type==="youtube" && <iframe className="w-full" src={link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>} */}

                {type==="youtube" && <YouTubeEmbed id={link.split("v=").pop() || ""}/>}

                {/* {type==="youtube" && <iframe className="w-full" src={link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>} */}

                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/DjZj_ZRLUuA?si=xs0_1cv-Nh4X18Oj" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}
                
                {/*  "https://www.youtube.com/embed/fh3G-K-kn3Q?si=x-Xy7t-O531O4Ieo" */}


                {type === "twitter" && (
                        <div className="twitter-embed">
                            {/* Extract tweet ID from the link */}
                            <TwitterTweetEmbed
                                tweetId={link.split("/").pop() || ""}
                            />
                        </div>
                    )}




                {/* {type==="twitter" &&  
                <blockquote className="twitter-tweet"> 
                    <a href={link}></a>
                </blockquote>} */}

               

            </div>
        </div>
    </div>




}