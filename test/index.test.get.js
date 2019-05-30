
/**
 * Test index.js GET method calls
 */

'use strict'

// ENV Vars
process.env.LAMBDA_TESTER_NODE_VERSION_CHECK = false
process.env.VANDIUM_PREVENT_EVAL = false

// Lambda handler
const handler = require('../index').handler

// Testing libs
const LambdaTester = require('lambda-tester')
const expect = require('chai').expect

// Load params used in the handler calls
let params = require('./params.get.json')

// Begin tests
describe('index.js', function() {

    beforeEach(function() {
    })

    after( function() {
        // Reload Params
        params = require('./params.get.json')
    })

    describe('Testing Response Structure', () => {

        it('test that ok response structure is correct', (done) => {

            // Define the params sent to the handler
            params.queryStringParameters = {
                os : 'all'
            }

            // Call the handler with the params
            LambdaTester(handler)
                .event(params)
                .expectResult( (result) => {
                    console.log("result")
                    console.log(result)
                    expect(result).to.have.property('statusCode')
                    expect(result.statusCode).to.be.a('number')
                    expect(result.statusCode).to.equal(200)
                }).then(() => {
                    return done()
                })
                .catch((error) => {
                    return done(error)
                })
        })
    })
})

