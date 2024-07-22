import Programs from "@/components/programs";
import connectDB from "@/lib/dbConnection";
import { getDataFromDb } from "@/lib/dbHelpers";
import program from "@/models/Program";

import { revalidatePath } from "next/cache";
import { cache } from "react";

import { getPlans } from "@/lib/subscription/utils";
import type { Program } from "@/types/program";

// ========================= get programs page data =========================
const getProgramsPageData = cache(async () => {
  try {
    await connectDB();

    const [gallery, plans, programs] = await Promise.all([
      getDataFromDb({ key: "gallery" }),
      getPlans(),
      program.find({}).lean() as Promise<Program[]>,
    ]);

    // const productsData: ProductWithPrices[] = products.map(
    //   (x: ProductWithPrices) => {
    //     const p = { ...x };
    //     delete (p as any)._id;
    //     return p;
    //   }
    // );

    const images = gallery?.images;

    return JSON.parse(
      JSON.stringify({
        images: images ?? [],
        programs: programs ?? [],
        plans: plans ?? [],
      })
    );
  } catch (error: any) {
    console.log(error);
    return null;
  }
});

// ========================= Programs Page Component =========================
export default async function Page() {
  const data = await getProgramsPageData();

  if (!data) {
    const handleRetry = async () => {
      "use server";
      revalidatePath("/programs");
    };

    return (
      <div className="h-[50vh] center">
        <div className="">
          <h1>Something went wrong</h1>

          <form action={handleRetry}>
            <button
              // onClick={() => {
              //   window.location.reload();
              // }}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              type="submit"
            >
              Retry
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <Programs {...data!} />;
}