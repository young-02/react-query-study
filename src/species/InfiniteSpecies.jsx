import InfiniteScroll from "react-infinite-scroller";

import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    ["sw-species"],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!{error.toString()}</div>;

  return (
    <>
      {isFetching && <div>isLoading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageDate) => {
          return pageDate.results.map((species) => {
            return (
              <Species
                key={species.name}
                name={species.name}
                language={species.language}
                averageLifespan={species.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
