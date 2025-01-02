import Header from "../Components/common/Header.jsx";
import BlogHero from "../Components/blog/BlogHero.jsx";
import BlogCardSection from "../Components/blog/BlogCardSection.jsx";
import Footer from "../Components/common/Footer.jsx";

function BlogPage() {

  return (
    <>
    <Header />
    <BlogHero />
    <hr className="my-10 border-gray-500"/>
    <BlogCardSection />
    <Footer />
    </>
  );
}

export default BlogPage;

