import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
  Form,
  Input,
  Spinner,
} from "@heroui/react";

function SignUp({ setUser, socket }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = sessionStorage.getItem("user");
    setIsLoading(false);

    if (session) {
      setUser(session);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));

    sessionStorage.setItem("user", data.name);
    socket.emit("user", data.name);
    setUser(data.name);
  };

  return (
    <div className="min-h-screen max-h-screen flex justify-center items-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <Card className="max-w-[300px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="heroui logo"
              height={40}
              radius="sm"
              src="favicon.ico"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">MADE Room</p>
              <p className="text-small text-default-500">made.phleebs.tech</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Form onSubmit={onSubmit} validationBehavior="native">
              <Input
                isRequired
                errorMessage="Please enter a valid name"
                label="Name"
                labelPlacement="inside"
                name="name"
                placeholder="Enter your name"
                type="text"
                autoComplete="off"
              />
              <Button type="submit">Submit</Button>
            </Form>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://chat-app-ruddy-iota.vercel.app/"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default SignUp;
