"use client";

import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FILTER_TYPES } from "@/constants/filter-type";
import {
  useGetDepartmentsQuery,
  useGetOfficesQuery,
} from "@/stores/features/user-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const filterSchema = z
  .object({
    fromDate: z.date().optional(),
    toDate: z.date().optional(),
    dept: z.string().optional(),
    studentIdNo: z.string().optional(),
    rfid: z.string().optional(),
    type: z.string().optional(),
    office: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.fromDate && data.toDate) {
        return data.toDate >= data.fromDate;
      }
      return true;
    },
    {
      message: "'To Date' cannot be earlier than 'From Date'",
      path: ["toDate"], // Attach error message to toDate field
    },
  );

export type FilterState = z.infer<typeof filterSchema>;

interface ReportFiltersProps {
  filters: TSearchFilterParams;
}

export function ReportFilters({ filters }: ReportFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const d_department = useGetDepartmentsQuery();
  const d_office = useGetOfficesQuery();

  const departments = d_department?.data ?? [];
  const offices = d_office?.data ?? [];

  // Helper to parse query params or initial props into Date objects
  const parseDateParam = (paramValue?: string | null) => {
    if (!paramValue) return undefined;
    const parsed = new Date(paramValue);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FilterState>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      fromDate: parseDateParam(
        filters?.fromDate ?? searchParams.get("fromDate"),
      ),
      toDate: parseDateParam(filters?.toDate ?? searchParams.get("toDate")),
      type: filters?.type ?? searchParams.get("type") ?? "",
      dept: filters?.dept ?? searchParams.get("dept") ?? "",
      office: filters?.office ?? searchParams.get("office") ?? "",
      studentIdNo:
        filters?.studentIdNo ?? searchParams.get("studentIdNo") ?? "",
      rfid: filters?.rfid ?? searchParams.get("rfid") ?? "",
    },
  });

  const fromDate = watch("fromDate");
  const type = watch("type") ?? "";

  const onSubmit = (data: FilterState) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("size", "15");

    const updateParam = (key: string, val?: string) => {
      const trimmed = val?.trim();
      if (trimmed) {
        params.set(key, trimmed);
      } else {
        params.delete(key);
      }
    };
    updateParam(
      "fromDate",
      data.fromDate ? data.fromDate.toISOString().split("T")[0] : "",
    );
    updateParam(
      "toDate",
      data.toDate ? data.toDate.toISOString().split("T")[0] : "",
    );
    updateParam("type", data.type);
    updateParam("dept", data.dept);
    updateParam("office", data.office);
    updateParam("studentIdNo", data.studentIdNo);
    updateParam("rfid", data.rfid);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    reset({
      fromDate: undefined,
      toDate: undefined,
      dept: "",
      studentIdNo: "",
      rfid: "",
    });

    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("size", "15");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {/* FROM DATE */}
        <div className="space-y-2">
          <Controller
            control={control}
            name="fromDate"
            render={({ field }) => (
              <DatePicker
                id="fromDate"
                label="From Date"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.fromDate && (
            <p className="text-xs font-medium text-destructive">
              {errors.fromDate.message}
            </p>
          )}
        </div>

        {/* TO DATE */}
        <div className="space-y-2">
          <Controller
            control={control}
            name="toDate"
            render={({ field }) => (
              <DatePicker
                id="toDate"
                label="To Date"
                value={field.value}
                onChange={field.onChange}
                minDate={watch("fromDate")}
              />
            )}
          />
          {errors.toDate && (
            <p className="text-xs font-medium text-destructive">
              {errors.toDate.message}
            </p>
          )}
        </div>

        {/* TYPE DROPDOWN */}
        <div className="space-y-2">
          <Label htmlFor="type" className="text-xs font-semibold">
            Type
          </Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              const selectedItem =
                FILTER_TYPES?.find((d) => d.value === field.value) ?? null;

              return (
                <Combobox
                  items={FILTER_TYPES ?? []}
                  value={selectedItem}
                  onValueChange={(val) => {
                    const nextValue =
                      typeof val === "string"
                        ? val
                        : val && typeof val === "object" && "value" in val
                          ? val.value
                          : "";
                    field.onChange(nextValue);
                  }}
                >
                  <ComboboxInput placeholder="Select type" showClear />
                  <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item.value} value={item}>
                          {item.label}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              );
            }}
          />
          {errors.type && (
            <p className="text-xs font-medium text-destructive">
              {errors.type.message}
            </p>
          )}
        </div>

        {/* OFFICE DROPDOWN */}
        {["officer", "staff", "teacher"].includes(type) && (
          <div className="space-y-2">
            <Label htmlFor="office" className="text-xs font-semibold">
              Office
            </Label>
            <Controller
              control={control}
              name="office"
              render={({ field }) => {
                const selectedItem =
                  offices?.find((o) => o.value === field.value) ?? null;

                return (
                  <Combobox
                    items={offices ?? []}
                    value={selectedItem}
                    onValueChange={(val) => {
                      const nextValue =
                        typeof val === "string"
                          ? val
                          : val && typeof val === "object" && "value" in val
                            ? val.value
                            : "";
                      field.onChange(nextValue);
                    }}
                  >
                    <ComboboxInput placeholder="Select office" showClear />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item.value} value={item}>
                            {item.label}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                );
              }}
            />
            {errors.office && (
              <p className="text-xs font-medium text-destructive">
                {errors.office.message}
              </p>
            )}
          </div>
        )}

        {/* STUDENT ID & DEPARTMENT DROPDOWN */}
        {["honours", "mphil", "evening"].includes(type) && (
          <>
            <div className="space-y-2">
              <Label htmlFor="studentIdNo" className="text-xs font-semibold">
                Student ID
              </Label>
              <Input
                id="studentIdNo"
                type="text"
                placeholder="STU-001"
                {...register("studentIdNo")}
              />
              {errors.studentIdNo && (
                <p className="text-xs font-medium text-destructive">
                  {errors.studentIdNo.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dept" className="text-xs font-semibold">
                Department
              </Label>
              <Controller
                control={control}
                name="dept"
                render={({ field }) => {
                  const selectedItem =
                    departments?.find((d) => d.value === field.value) ?? null;

                  return (
                    <Combobox
                      items={departments ?? []}
                      value={selectedItem}
                      onValueChange={(val) => {
                        const nextValue =
                          typeof val === "string"
                            ? val
                            : val && typeof val === "object" && "value" in val
                              ? val.value
                              : "";
                        field.onChange(nextValue);
                      }}
                    >
                      <ComboboxInput
                        placeholder="Select department"
                        showClear
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item.value} value={item}>
                              {item.label}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  );
                }}
              />
              {errors.dept && (
                <p className="text-xs font-medium text-destructive">
                  {errors.dept.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* RFID */}
        <div className="space-y-2">
          <Label htmlFor="rfid" className="text-xs font-semibold">
            RFID
          </Label>
          <Input
            id="rfid"
            type="text"
            placeholder="RF1001"
            {...register("rfid")}
          />
          {errors.rfid && (
            <p className="text-xs font-medium text-destructive">
              {errors.rfid.message}
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
