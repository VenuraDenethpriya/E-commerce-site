
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from "react-router";


function Hero() {

    return (
        <section className="px-8 mx-16">
            <Carousel className="w-full">
                <CarouselContent>
                    <CarouselItem>
                        <div className="grid grid-cols-2 rounded-md min-h-[60vh] bg-[#f4f8f9]">
                            <div className="flex flex-col justify-center p-16 gap-4">
                                <span className="inline-block bg-[#febc26] w-fit rounded-full text-xs py-1 px-2">WEEKLY DISCOUNT</span>
                                <h1 className="text-6xl font-semibold">Premium Product Online Shop</h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quos
                                    suscipit est autem quia? Voluptatem?
                                </p>
                                <Link to='/shop'>
                                    <Button className="w-fit">
                                        Shop Now
                                    </Button>
                                </Link>

                            </div>
                            <div className="">
                                <img
                                    src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
                                    alt=""
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="grid grid-cols-2 rounded-md min-h-[60vh] bg-[#f4f8f9]">
                            <div className="flex flex-col justify-center p-16 gap-4">
                                <span className="inline-block bg-[#febc26] w-fit rounded-full text-xs py-1 px-2">SEASIONAL DISCOUNT</span>
                                <h1 className="text-6xl font-semibold">Premium Product Online Shop</h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quos
                                    suscipit est autem quia? Voluptatem?
                                </p>
                                <Button className="w-fit">
                                    <a to="/shop">Shop Now</a>
                                </Button>
                            </div>
                            <div className="">
                                <img
                                    src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
                                    alt=""
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="grid grid-cols-2 rounded-md min-h-[60vh] bg-[#f4f8f9]">
                            <div className="flex flex-col justify-center p-16 gap-4">
                                <span className="inline-block bg-[#febc26] w-fit rounded-full text-xs py-1 px-2">BLACK FRIDAY</span>
                                <h1 className="text-6xl font-semibold">Premium Product Online Shop</h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quos
                                    suscipit est autem quia? Voluptatem?
                                </p>
                                <Button className="w-fit">
                                    <a to="/shop">Shop Now</a>
                                </Button>
                            </div>
                            <div className="">
                                <img
                                    src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
                                    alt=""
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </section>
    );
}
export default Hero;