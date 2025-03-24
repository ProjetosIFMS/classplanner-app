import { Card, CardContent } from "./ui/card";

const Footer = () => {
  return (
    <footer className="w-full">
      <Card>
        <CardContent className="py-5">
          <p className="text-sm text-gray-400 text-center">
            <span>© 2025 Copyright - </span>
            <span className="font-bold">Todos os direitos reservados</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  );
};

export default Footer;
