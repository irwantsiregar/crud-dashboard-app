import { LIMIT_LISTS } from "@/constants/limit.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Key, ReactNode, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";

type PropTypes = {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  hideTopContent?: boolean;
  hideBottomContent?: boolean;
  isLoading?: boolean;
  onSortChange?: (descriptor: SortDescriptor) => void;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columKey: Key) => ReactNode;
  totalPages: number;
  thTransparent?: boolean;
  placeholderSearch?: string;
};

const DataTable = (props: PropTypes) => {
  const {
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    hideTopContent,
    hideBottomContent,
    onSortChange,
    onClickButtonTopContent,
    renderCell,
    totalPages,
    thTransparent,
    placeholderSearch = "Search..",
  } = props;

  const {
    currentLimit,
    currentPage,

    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "title",
    direction: "ascending",
  });

  const TopContent = useMemo(() => {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 lg:flex-row lg:items-center",
          !buttonTopContentLabel ? "justify-end" : "justify-between",
        )}
      >
        <Input
          isClearable
          className="w-full lg:max-w-[24%]"
          placeholder={placeholderSearch}
          startContent={<CiSearch />}
          onChange={handleSearch}
          onClear={handleClearSearch}
        />

        {buttonTopContentLabel && (
          <Button
            className="min-w-full font-semibold lg:min-w-min"
            color="danger"
            onPress={onClickButtonTopContent}
          >
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, []);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        <Select
          className="hidden max-w-36 lg:block"
          size="md"
          selectedKeys={[String(currentLimit)]}
          selectionMode="single"
          onChange={handleChangeLimit}
          startContent={<p className="text-small">Show:</p>}
          disallowEmptySelection
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value} textValue={`${item.value}`}>
              {item.label}
            </SelectItem>
          ))}
        </Select>

        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="danger"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
          />
        )}
      </div>
    );
  }, [
    currentLimit,
    Number(currentPage),
    totalPages,
    handleChangeLimit,
    handleChangePage,
  ]);

  const classRow = {
    th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
    td: [
      "group-data-[first=true]/tr:first:before:rounded-none",
      "group-data-[first=true]/tr:last:before:rounded-none",
      "group-data-[middle=true]/tr:before:rounded-none",
      "group-data-[last=true]/tr:first:before:rounded-none",
      "group-data-[last=true]/tr:last:before:rounded-none",
    ],
  };

  return (
    <Table
      // isCompact
      aria-label="table-features"
      bottomContent={!hideBottomContent && BottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
        th: thTransparent ? classRow.th : "",
        td: thTransparent ? "" : classRow.td,
      }}
      topContent={!hideTopContent && TopContent}
      topContentPlacement="outside"
      onSortChange={(descriptor) => {
        if (onSortChange) {
          onSortChange(descriptor);

          setSortDescriptor(descriptor);
        }
      }}
      sortDescriptor={sortDescriptor}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid as Key}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={!!column.sortable}
          >
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={emptyContent}
        items={data}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner color="danger" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columKey) => <TableCell>{renderCell(item, columKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
