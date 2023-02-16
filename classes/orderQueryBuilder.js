class OrderQueryBuilder {
  constructor(queryRunner) {
    this.queryBuilder = queryRunner
    this.rawQuery
    this.params
    this.paymentAmount
  }

  query(rawQuery, params) {
    return this.queryBuilder.query(rawQuery, params)
  }

  connect() {
    return this.queryBuilder.connect()
  }

  startTransaction() {
    return this.queryBuilder.startTransaction()
  }

  commit() {
    return this.queryBuilder.commit()
  }

  release() {
    return this.queryBuilder.release()
  }
}

module.exports = OrderQueryBuilder
