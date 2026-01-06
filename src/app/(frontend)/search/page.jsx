import Container from "@/components/common/Container/Container";
import Search from "@/components/frontend/search/Search";

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
