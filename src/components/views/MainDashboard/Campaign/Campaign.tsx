import { Card, CardHeader, Image } from "@heroui/react";

const Campaign = () => {
  return (
    <div className="grid max-w-[900px] grid-cols-12 grid-rows-2 gap-4">
      <Card className="col-span-12 h-[300px]">
        <CardHeader className="absolute top-1 z-10 flex-col !items-start">
          <p className="text-tiny font-bold uppercase text-white/60">
            Upgrade to get more
          </p>
          <h4 className="text-large font-medium text-white">
            Contribute to the nature
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 h-full w-full object-cover"
          src="https://heroui.com/images/card-example-3.jpeg"
        />
      </Card>

      <Card className="col-span-12 h-[300px]">
        <CardHeader className="absolute top-1 z-10 flex-col !items-start">
          <p className="text-tiny font-medium uppercase text-default-400">
            Supercharged
          </p>
          <h4 className="text-large font-medium text-default-500">
            Creates beauty like a beast
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 h-full w-full object-cover"
          src="/images/shopping-man.png"
        />
      </Card>
    </div>
  );
};

export default Campaign;
