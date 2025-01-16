import React, { useState, useEffect } from 'react'
import StickyNavbar from '../Components/Navbar'
import { Typography, Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import RelatedArticles from '../Components/RelatedArticles'
import Announcement from '../Components/Announcements'
const SingleArticle = () => {
    const [IsLargeScreen, setIsLargeScreen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768); // Tailwind's md breakpoint is 768px
        };

        // Set initial screen size and add event listener
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])
    return (
        <>
            <StickyNavbar />
            <section
                className="p-4 bg-lightbg"

            >
                <div className="flex text-center text-light h-auto">
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <RelatedArticles />
                        <Announcement />
                    </div>

                    <div className="flex flex-col col-span-4 items-center">
                        <Typography variant="h1" className="text-4xl font-bold text-primary">Breastfeeding</Typography>
                        <Typography variant="small" className="italic">
                            Published on January 15, 2025
                        </Typography>
                        <img src="https://plus.unsplash.com/premium_photo-1682090496470-6eec9f5bcc89?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image of a mother breastfeeding" className="w-1/2 mt-4" />
                        <Typography variant="paragraph" className='w-1/2 my-2 text-left'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam tempore aspernatur soluta fugit quasi corporis perspiciatis ab inventore, beatae voluptas laborum est vitae. Perferendis delectus ea, quae voluptas hic similique. Repellat, aperiam impedit nemo dicta unde illum reiciendis amet nostrum iure quam soluta aspernatur itaque, dignissimos consequuntur! Debitis, velit magnam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia dolor architecto veniam repellendus quas aliquid quod corporis exercitationem, sunt corrupti, vel in dolore rem sint beatae et ducimus est molestias, saepe aliquam officiis earum veritatis nihil! Perspiciatis provident laborum similique doloremque minus odit nobis architecto quos praesentium eveniet, voluptate mollitia eligendi a amet deserunt molestiae illum eum aliquid, quaerat harum fugiat esse, perferendis corrupti debitis? Debitis aperiam quos dolores, unde blanditiis quae totam necessitatibus esse veniam quis corporis beatae amet aliquam nulla eveniet delectus doloribus incidunt ducimus cum repellat iusto! Blanditiis tempora atque autem molestiae non suscipit culpa fugiat totam deleniti voluptatum exercitationem, placeat, voluptatibus quo dolores saepe, maxime laboriosam cum rerum. Adipisci expedita voluptas, cupiditate amet itaque dolores aspernatur eum veniam tenetur possimus numquam consectetur doloribus aperiam labore quibusdam repellat tempora ipsum, modi magnam omnis nemo. Modi delectus molestias, totam, quod similique quas officiis iusto adipisci repellat voluptates, quam rem dolore praesentium deserunt eaque dignissimos. Ipsam sed esse explicabo officiis magnam a sapiente quas, perspiciatis minima est ab in, doloremque culpa, eaque odit! Quasi aperiam laboriosam voluptatem nisi totam labore iure dicta vero ipsa eveniet, similique reprehenderit necessitatibus eligendi libero. Inventore sed quam quibusdam doloremque. Consectetur dolorum repellendus sequi non hic, numquam, qui est sapiente voluptas quasi tenetur excepturi dolore voluptatem possimus impedit delectus laboriosam sunt vero consequuntur dolor fugiat ipsam provident magnam. Quos cumque eos, delectus libero unde molestiae, quia consequatur, voluptatibus magnam porro aperiam saepe pariatur natus ipsa nam tempore ab animi quibusdam? Nulla reiciendis culpa nobis animi ut, facere necessitatibus beatae corporis, in dolorum tempore nisi ea, exercitationem labore obcaecati eaque ipsa eius aliquid numquam. Odio magnam atque incidunt laborum minus aliquam consequatur iste nostrum ea similique dolore magni vero fuga delectus sunt, ad vel quibusdam veniam ab dignissimos consectetur eaque rerum. Atque, recusandae, ab labore optio, obcaecati aliquam eum sequi corrupti iste quidem cupiditate eligendi sint veritatis culpa vitae velit ullam nihil doloribus. Repudiandae ab odit voluptas tenetur minus vitae quidem natus vel nulla non aperiam aliquam eum sapiente, mollitia nisi voluptatibus dolorum dicta, fugit itaque suscipit eaque laboriosam nostrum recusandae magni. Ratione accusantium voluptatibus recusandae unde illum sit earum nesciunt expedita qui neque autem dolor, rem maiores iste iusto suscipit quibusdam placeat error? Placeat, eligendi voluptatem ea sit doloribus modi aperiam iure libero reiciendis autem repudiandae recusandae enim voluptate pariatur dolore soluta atque eveniet et ipsum dolor? Omnis esse fugiat id nam, ullam commodi exercitationem provident, libero, dolores molestias sapiente. Totam sunt sapiente fuga, temporibus perferendis suscipit corporis laboriosam. Illo ea aliquam corrupti enim magni ipsam accusamus alias, eaque facere hic voluptatum id, excepturi et totam corporis temporibus odio ipsum dicta dignissimos, aut necessitatibus blanditiis inventore itaque voluptates! Ut similique est atque, quidem eum aspernatur eligendi sint obcaecati laudantium molestiae asperiores quae repellendus, quis molestias facilis aliquam necessitatibus veniam? Vero eligendi tenetur aperiam iste doloremque assumenda ad adipisci, asperiores libero sequi, earum architecto? Tempora accusantium facere eligendi incidunt ducimus accusamus beatae dolor sint recusandae earum, illo distinctio, dolore, culpa deleniti quam rerum a quia!
                        </Typography>
                    </div>
                    <div>
                        {/* news and announcement */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleArticle