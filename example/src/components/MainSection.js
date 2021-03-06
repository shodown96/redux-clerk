import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.get('completed'),
  [SHOW_COMPLETED]: todo => todo.get('completed')
}

export default class MainSection extends Component {
  static propTypes = {
    todos: ImmutablePropTypes.list.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = { filter: SHOW_ALL }


  handleShow = filter => {
    this.setState({ filter })
  }

  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.size - completedCount

    if (todos.size) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }

  render() {
    const { todos, actions } = this.props
    const { filter } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) =>
      todo.get('completed') ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.get('id')} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}
