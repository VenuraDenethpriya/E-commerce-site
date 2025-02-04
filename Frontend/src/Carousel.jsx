import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./components/ui/button"
import { Link } from "react-router"

export function CarouselPlugin() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className=""
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="">
                            <Card>
                                <CardContent className="p-0">
                                    <div className="grid sm:grid-cols-2 rounded-md sm:min-h-[60vh] bg-[#f4f8f9]">
                                        <div className="hidden sm:flex flex-col sm:w-auto sm:h-auto justify-center gap-4 px-8">
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
                                                className="sm:w-full sm:h-full"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

