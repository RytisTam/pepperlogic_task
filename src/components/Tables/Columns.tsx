'use client'

import { DndContext } from '@dnd-kit/core'
import React, { useState } from 'react'
import Droppable from './Droppable'
import Draggable from './Draggable'
import { CryptoItem } from '../../../utils/cryptocurrencyTypes'
import { fetchCryptoPriceHistory } from '../../../utils/CoinLayer'
import { convertSparklineToDateObjects } from '../../../utils/convertSparklineToDateObjects'

const Columns = ({ cryptos }: { cryptos: CryptoItem[] }) => {
  const [availableCryptos, setAvailableCryptos] = useState<CryptoItem[]>(cryptos)
  const [watchedCryptos, setWatchedCryptos] = useState<CryptoItem[]>([])

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) return;

    const fromLeftToRight = over.id === 'right' && availableCryptos.find((crypto) => crypto.id === active.id);
    const fromRightToLeft = over.id === 'left' && watchedCryptos.find((crypto) => crypto.id === active.id);

    if (fromLeftToRight) {
      const draggedCrypto = availableCryptos.find((crypto) => crypto.id === active.id);
      if (draggedCrypto) {
        setWatchedCryptos((prev) => {
          const updated = [...prev, draggedCrypto];
          updatePrices(updated);
          return updated;
        });
        setAvailableCryptos((prev) => prev.filter((crypto) => crypto.id !== active.id));
      }
    }

    if (fromRightToLeft) {
      const draggedCrypto = watchedCryptos.find((crypto) => crypto.id === active.id);
      if (draggedCrypto) {
        setAvailableCryptos((prev) => [...prev, draggedCrypto]);
        setWatchedCryptos((prev) => {
          const updated = prev.filter((crypto) => crypto.id !== active.id);
          updatePrices(updated);
          return updated;
        });
      }
    }
  }

  async function updatePrices(updatedWatchedCryptos: CryptoItem[]) {
    try {
      if (updatedWatchedCryptos.length === 0) return

      const ids = updatedWatchedCryptos.map((crypto) => crypto.id).join(',')
      const response = await fetchCryptoPriceHistory(ids)
      setWatchedCryptos((prev) => {
        return prev.map((crypto) => {
          const updatedCrypto = response.find((item) => item.id === crypto.id);
          if (updatedCrypto) {
            const sparklineWithDates = convertSparklineToDateObjects(updatedCrypto.sparkline_in_7d.price)
            if (updatedCrypto) {
              return {
                ...crypto,
                ...updatedCrypto,
                sparkline: sparklineWithDates
              };
            }
          }

          return crypto;
        });
      });

    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }



  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Droppable id="left" width={300}>
          <h3 className='mb-4'>Unwatched List</h3>
          <div>
            {availableCryptos.map((crypto) => (
              <Draggable key={crypto.id} crypto={crypto} withHistory={false} />
            ))}
          </div>
        </Droppable>

        <Droppable id="right" width={850}>
          <h3 className='mb-4'>Watch List</h3>
          <div>
            {watchedCryptos.map((crypto) => (
              <Draggable key={crypto.id} crypto={crypto} withHistory={true} />
            ))}
          </div>
        </Droppable>
      </div>
    </DndContext>
  )
}

export default Columns
