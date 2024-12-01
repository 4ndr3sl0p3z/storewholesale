'use client'

import Image from 'next/image';
import database from '../helpers/products.json'
import { fCurrency } from "./utils/formatNumber";
import { useRouter } from 'next/navigation';
import usePagination from '@/hooks/usePagination';
import { useEffect, useState } from 'react';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {

  const router = useRouter();
  const [filterData, setFilterData] = useState<any>([]);
  const { activePage, nextPage, previousPage, totalPages, totalItems, items, handlePage } = usePagination(filterData);

  useEffect(() => {
    setFilterData(database)
  }, [database])

  return (
    <div
      className=' flex flex-col gap-4'
    >
      <div
        className="
          grid
          grid-cols-3
          gap-4
          p-6
          max-md:grid-cols-2
          max-sm:grid-cols-1
        "
      >
        {
          items.map((x: any, indexP: number) => (
            <div
              className="
                flex
                flex-col
                rounded-md
                border
                overflow-hidden
                h-[450px]
                cursor-pointer
              "
              key={indexP}
              onClick={() => router.push(`/productDetail/${x.name}`)}
            >
              <div
                className="
                  bg-gray-50
                  flex-1
                  flex
                  overflow-hidden
                  w-full
                  justify-center
                  relative
                "
              >
                {/* <img
                  className="
                    max-h-full
                    object-contain
                    object-center
                  "
                  src = { x.images[0].url }
                /> */}
                <Image
                  src={x.images[0]?.url}
                  alt=""
                  fill
                  sizes="100%"
                  style={{
                    width: "100%",
                    objectFit: "contain"
                  }}
                  className='
                      hover:scale-110
                      duration-500
                      transition-transform
                    '
                  priority
                />
              </div>
              <div
                className="
                  border-t
                  p-4
                  flex
                  flex-col
                  gap-1
                "
              >
                <span
                  className="
                    text-gray-500
                    text-center
                    font-semibold
                  "
                >{x.name}</span>
                <div
                  className='
                    flex
                    flex-row
                    gap-1
                    border
                    p-1
                  '
                >
                  <div
                    className='
                      flex-1
                      flex
                      flex-col
                    '
                  >
                    <span
                      className="
                        text-gray-500
                      "
                    >
                      Al detal
                    </span>
                    <span
                      className="
                        text-gray-600
                        font-semibold
                      "
                    >
                      {fCurrency(x.retail)}
                    </span>
                  </div>
                  <div
                    className='
                      flex
                      flex-col
                      flex-1
                      items-center
                    '
                  >
                    <span
                      className="
                        text-gray-500
                      "
                    >
                      x Mayor
                    </span>
                    <span
                      className="
                        text-gray-600
                        font-semibold
                      "
                    >
                      {fCurrency(x.wholesale)}
                    </span>
                  </div>

                  <div
                    className='
                      flex-1
                      flex
                      flex-col
                      items-center
                    '
                  >
                    <span
                      className="
                        text-gray-500
                      "
                    >
                      C. Mínima
                    </span>
                    <span
                      className="
                        text-gray-600
                        font-semibold
                      "
                    >
                      {x.quantityW}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div
        className='flex flex-row gap-1 justify-center items-center py-2 mb-3'
      >
        <Button
          variant={'default'}
          size = "icon"
          onClick={previousPage}
          disabled={activePage <= 1}
        >
          <CircleArrowLeft />
        </Button>
        <span>
          Página {activePage}/{totalPages}
        </span>
        <Button
          onClick={nextPage}
          size = "icon"
          disabled={activePage >= totalPages}
        >
          <CircleArrowRight />
        </Button>
      </div>
    </div>
  );
}
