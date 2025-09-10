import ArticleCard from "../ArticleCard";
import testImg from "../../assets/images/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_août_2014_(2).jpg";

function Articles() {
  return (
    <div className="bg-[rgb(20,20,20)]">
      <div className="mx-auto w-[60%] pt-15 pb-20">
        <nav className="flex items-center justify-between p-4">
          <ul className="flex gap-8 text-lg text-gray-200">
            <Topic name="All" />
            <Topic name="Music" />
            <Topic name="Fashion" />
            <Topic name="Tech" />
          </ul>
        </nav>
        <ArticleCard
          title="The Rise of AI in Music Production"
          image={testImg}
          topic="Music"
          mins={5}
        />
      </div>
    </div>
  );
}

function Topic({ name }: { name: string }) {
  return (
    <li className="cursor-pointer rounded-2xl px-3 py-1.5 active:bg-gray-600">
      {name}
    </li>
  );
}

export default Articles;
