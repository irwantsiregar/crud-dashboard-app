import ButtonsAction from "@/components/commons/ButtonsAction/ButtonsAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { totalPages } from "@/utils/totalPages";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { COLUMN_LISTS_POSTS } from "./Posts.constants";
import usePosts from "./usePosts";

const Posts = () => {
  const { push, isReady, query } = useRouter();

  const {
    dataPosts,

    isLoadingPosts,
    isRefetchingPosts,

    refetchPosts,
    selectedId,
    setSelectedId,
  } = usePosts();

  const addPostsModal = useDisclosure();
  const deletePostsModal = useDisclosure();

  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  const renderCell = useCallback(
    (post: Record<string, unknown>, columKey: Key) => {
      const cellValue = post[columKey as keyof typeof post];

      switch (columKey) {
        case "title":
          return <h4 className="flex font-semibold">{cellValue as string}</h4>;
        case "body":
          return (
            <div className="flex">{(cellValue as string).slice(0, 70)}</div>
          );
        case "tags":
          const arrTags = cellValue as Array<string>;
          return (
            arrTags?.length > 0 && (
              <div className="flex flex-wrap gap-1 p-1">
                {arrTags.map((tag: string) => (
                  <Chip
                    className="border-default-200"
                    variant="bordered"
                    startContent={<>#</>}
                    key={tag}
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
            )
          );
        case "reactions":
          const reaction = cellValue as Record<string, number>;
          return (
            <div className="flex gap-1 p-1">
              {Object.keys(reaction).map((key: string) => (
                <Chip
                  className="border-default-200"
                  variant="bordered"
                  startContent={
                    key === "likes" ? (
                      <AiOutlineLike className="text-blue-600" />
                    ) : (
                      <AiOutlineDislike className="text-danger" />
                    )
                  }
                  key={key}
                >
                  {reaction[key]}
                </Chip>
              ))}
            </div>
          );
        case "actions":
          return (
            <ButtonsAction
              onPressButtonDetail={() => {}}
              onPressButtonUpdate={() => {
                setSelectedId(`${post?.id}`);
              }}
              onPressButtonDelete={() => {
                setSelectedId(`${post?.id}`);
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Post"
          columns={COLUMN_LISTS_POSTS}
          data={dataPosts?.posts || []}
          emptyContent="Post is empty"
          isLoading={isLoadingPosts || isRefetchingPosts}
          onClickButtonTopContent={addPostsModal.onOpen}
          renderCell={renderCell}
          totalPages={totalPages(dataPosts?.total)}
          placeholderSearch="Search by title"
        />
      )}
    </section>
  );
};

export default Posts;
