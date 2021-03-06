import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'grid-styled'

import Text from 'ui/Text'
import ImportanceRaiting from 'ui/ImportanceRating'
import Button from 'ui/Button'
import TextArea from 'ui/TextArea'

const BoxTodo = styled.div`
width: 500px;
margin-top: 30px;
padding: 10px;
background-color: #fff;
border-radius: 5px;
overflow: hidden;
`

export default class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      id: props.id,
      text: props.text,
      active: props.active,
      importance: props.importance,
    }
    this.onEditMode = this.onEditMode.bind(this)
    this.onEditTodo = this.onEditTodo.bind(this)
    this.onChangeImportance = this.onChangeImportance.bind(this)
    this.onChangeTodo = this.onChangeTodo.bind(this)
    this.onChangeCompleted = this.onChangeCompleted.bind(this)
  }

  onEditMode() {
    this.setState({
      editMode: true,
    })
  }

  onChangeImportance(i) {
    this.setState({
      importance: i,
    })
  }

  onChangeTodo(e) {
    this.setState({
      text: e.target.value,
    })
  }

  onChangeCompleted(id, active) {
    this.setState({
      active: !this.state.active,
    })
    this.props.editCompleted(id, active)
  }

  onEditTodo(id, text, importance, active) {
    this.setState({
      editMode: false,
    })
    this.props.editTodo(id, text, importance, active)
  }

  render() {
    const { editMode, id, text, importance, active } = this.state
    return (
      <BoxTodo>
        <Box
          mt='8px'
        />
        {
          this.state.editMode ?
            <TextArea  
              value={text}
              onChange={this.onChangeTodo}
              editMode
              autoFocus={true}
            />
            : 
            <Text 
              text={text} 
            />
        }
        <Flex
          justifyContent='space-between'
          alignItems='center'
          css={{
            marginTop: '8px',
          }}
        >
          <ImportanceRaiting
            maxImportance={6}
            importance={importance}
            onClick={editMode ? this.onChangeImportance : null}
            active={editMode}
          />
          <Flex>
            <Button
              text={active ?  'completed' : 'active'}
              onClick={() => this.onChangeCompleted(id, !active)}
              small
            />
            <Box
              mr='8px'
            />
            <Button
              text={editMode ? 'save' : 'edit'}
              small
              onClick={editMode ? () => this.onEditTodo(id, text, importance, active) : this.onEditMode}
            />
            <Box
              mr='8px'
            />
            <Button
              text='delete'
              onClick={() => this.props.delTodo(this.props.id)}
              small
              red
            />
          </Flex>
        </Flex>
      </BoxTodo>
    )
  }
}