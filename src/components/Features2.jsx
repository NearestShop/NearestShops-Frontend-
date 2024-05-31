import { Link } from "react-router-dom";

const Features2 = () => {
  return (
    <section className="container mx-auto text-center pb-2 md:pb-16 md:mb-16 text-white px-4">
      <div className="bg-center bg-cover py-[100px] md:py-[300px] relative xl:bg-fixed" style={{ backgroundImage: `url("/assets/bg1.jpg")` }}>
        <div className="absolute w-full h-full bg-black opacity-20 top-0 left-0" />
        <div className="relative z-[2] px-2">
          <h4 className="text-2xl md:text-4xl font-semibold mb-4">Be different in your own way!</h4>
          <p className="text-lg md:text-2xl font-semibold mb-4">Find your unique style.</p>
          <Link to="/collection" className="bg-secondary hover:bg-accent duration-200 text-white py-3 px-7 block w-fit mx-auto">Shop Collection</Link>
        </div>
      </div>
    </section>
  );
};

export default Features2;
