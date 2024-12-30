import React, { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { Paper } from '@mantine/core'

type droppableProps = {
  children: ReactNode;
  id: string;
  width: number;
}

function Droppable(props: droppableProps) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  })

  return (
    <Paper shadow="xl" p="xl" ref={setNodeRef} w={props.width}>
      {props.children}
    </Paper>
  )
}

export default Droppable