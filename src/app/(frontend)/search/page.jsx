import Container from "@/components/common/container/container";
import Search from "@/components/frontend/search/search";

const SearchPage = () => {
  return (
    <section className="bg-surface pt-3 lg:pt-0">
      <Container>
        <Search />
      </Container>
    </section>
  );
};

export default SearchPage;
