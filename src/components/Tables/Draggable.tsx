import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CryptoItem } from '../../../utils/cryptocurrencyTypes'
import { LineChart } from '@mantine/charts';
import { Paper, Text } from '@mantine/core';

function Draggable({ crypto, withHistory = false }: { crypto: CryptoItem, withHistory?: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: crypto.id,
  })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    background: '#2ecc71',
    boxShadow: '0px 5px 5px #00000020',
    marginBottom: '10px',
    color: 'white',
  }

  const imageStyle = {
    maxHeight: '150px',
    borderRadius: '5px'
  }

  return (
    <Paper shadow="sm" p="sm" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className={`grid grid-cols-3 ${!withHistory && 'grid-cols-1'}`}>
        <div>
          <Text fw={withHistory ? 700 : 400} size={withHistory ? 'xl' : 'md'} mb={14}>{crypto.name}</Text>
          {crypto.current_price && <Text><strong>Current Price:</strong> {crypto.current_price.toFixed(2)}$</Text>}
          {crypto.high_24h && <Text><strong>24h High:</strong> {crypto.high_24h.toFixed(2)}$</Text>}
          {crypto.low_24h && <Text><strong>24h Low:</strong> {crypto.low_24h.toFixed(2)}$</Text>}
        </div>
        <div>
          {crypto.market_cap && <Text><strong>Market Cap:</strong> {crypto.market_cap.toFixed(2)}$</Text>}
          {crypto.max_supply && <Text><strong>Max Supply:</strong> {crypto.max_supply.toFixed(2)}$</Text>}
          {crypto.price_change_percentage_24h && <Text><strong>% Price Change 24h:</strong> {crypto.price_change_percentage_24h.toFixed(2)}$</Text>}
        </div>
        <div className='justify-self-end'>
          {crypto.image && <img src={crypto.image} alt={crypto.name} style={imageStyle} />}
        </div>
      </div>
      {withHistory && crypto?.sparkline?.length > 0 &&
        <LineChart
          h={300}
          data={crypto.sparkline}
          style={{ backgroundColor: '#ffffff70', padding: '10px', marginTop: '5px', borderRadius: '5px' }}
          dataKey="Date"
          series={[
            { name: 'Price', color: 'white' },
          ]}
          connectNulls
          curveType="linear"
        />}
      {withHistory && crypto?.sparkline && crypto?.sparkline.length < 1 && <p>Failed to retrieve value history.</p>}
    </Paper>

  )
}

export default Draggable