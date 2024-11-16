import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Hero() {
  return (
    <section className="p-8 mx-16">
      <Carousel className="w-full">
            <CarouselContent>
                <CarouselItem>
                    <div className="grid grid-cols-2 rounded-md min-h-[60vh] bg-[#f4f8f9]">
                        <div className="flex flex-col justify-center p-16 gap-4">
                            <span className="inline-block bg-[#febc26] rounded-full w-fit text-xs py-1 px-2">
                            WEEKLY DISCOUNT
                            </span>
                            <h1 className="text-6xl font-semibold">
                            Premium Product <br /> Online Shop
                            </h1>
                            <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                            quos suscipit est autem quia? Voluptatem?
                            </p>
                            <Button className="w-fit" asChild>
                            <a to="/shop">Shop Now</a>
                            </Button>
                        </div>
                        <div className="">
                            <img
                            src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
                            alt="Hero-Image"
                            className="w-full h-full"
                            />
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem><img src="src\assets\Screenshot (860).png" className="h-full w-full"/></CarouselItem>
                <CarouselItem>...</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
      </Carousel>

        <div className="flex gap-5 flex-wrap">
            
        </div>
    </section>
    )
}

export default Hero;
