import React from 'react'
import Books from './Books'

class BookCat extends React.Component {

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) =>
                            <li key={book.id}>
                                <Books
                                    thumb={book.imageLinks?book.imageLinks.thumbnail:`http://via.placeholder.com/128x193?text=No%20Cover`}
                                    title={book.title}
                                    authors={book.authors}
                                    shelf={book.shelf}
                                    moveBook={this.props.moveBook}
                                    book={book}
                                />
                            </li>

                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookCat