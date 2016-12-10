import {Token, extendToken, extendLazyToken, extendSimpleLazyToken} from "../../src/scan/tokens_public"
import {Parser} from "../../src/parse/parser_public"
import {HashTable} from "../../src/lang/lang_extensions"
import {getLookaheadFuncsForClass} from "../../src/parse/cache"
import {tokenInstanceofMatcher, createSimpleLazyToken, createLazyTokenInstance, tokenStructuredMatcher} from "../../src/scan/tokens"
import {clearCache} from "../../src/parse/cache_public"
import {createRegularToken, createLazyToken, createSimpleToken} from "../utils/matchers"

function defineLookaheadSpecs(contextName, extendToken, createToken, tokenMatcher) {

    context("lookahead " + contextName, () => {

        after(() => {
            clearCache()
        })

        let OneTok = extendToken("OneTok")
        let TwoTok = extendToken("TwoTok")
        let ThreeTok = extendToken("ThreeTok")
        let FourTok = extendToken("FourTok")
        let FiveTok = extendToken("FiveTok")
        let SixTok = extendToken("SixTok")
        let Comma = extendToken("Comma")

        const ALL_TOKENS = [OneTok, TwoTok, ThreeTok, FourTok, FiveTok, SixTok, Comma]

        describe("The implicit lookahead calculation functionality of the Recognizer For OPTION", () => {

            class OptionsImplicitLookAheadParser extends Parser {

                public getLookAheadCache():HashTable<Function> {
                    return getLookaheadFuncsForClass(this.className)
                }

                constructor(input:Token[] = []) {
                    super(input, ALL_TOKENS);
                    (<any>Parser).performSelfAnalysis(this)
                }

                public manyOptionsRule = this.RULE("manyOptionsRule", this.parseManyOptionsRule, () => { return "-666" })

                private parseManyOptionsRule():string {
                    let total = ""

                    this.OPTION1(() => {
                        this.CONSUME1(OneTok)
                        total += "1"
                    })

                    this.OPTION2(() => {
                        this.CONSUME1(TwoTok)
                        total += "2"
                    })

                    this.OPTION3(() => {
                        this.CONSUME1(ThreeTok)
                        total += "3"
                    })

                    this.OPTION4(() => {
                        this.CONSUME1(FourTok)
                        total += "4"
                    })

                    this.OPTION5(() => {
                        this.CONSUME1(FiveTok)
                        total += "5"
                    })

                    return total
                }
            }

            it("will cache the generatedLookAhead functions BEFORE (check cache is clean)", () => {
                let parser = new OptionsImplicitLookAheadParser([])
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(0)
            })

            it("can automatically compute lookahead for OPTION1", () => {
                let input = [createToken(OneTok)]
                let parser = new OptionsImplicitLookAheadParser(input)
                expect(parser.manyOptionsRule()).to.equal("1")
            })

            it("can automatically compute lookahead for OPTION2", () => {
                let input = [createToken(TwoTok)]
                let parser = new OptionsImplicitLookAheadParser(input)
                expect(parser.manyOptionsRule()).to.equal("2")
            })

            it("can automatically compute lookahead for OPTION3", () => {
                let input = [createToken(ThreeTok)]
                let parser = new OptionsImplicitLookAheadParser(input)
                expect(parser.manyOptionsRule()).to.equal("3")
            })

            it("can automatically compute lookahead for OPTION4", () => {
                let input = [createToken(FourTok)]
                let parser = new OptionsImplicitLookAheadParser(input)
                expect(parser.manyOptionsRule()).to.equal("4")
            })

            it("can automatically compute lookahead for OPTION5", () => {
                let input = [createToken(FiveTok)]
                let parser = new OptionsImplicitLookAheadParser(input)
                expect(parser.manyOptionsRule()).to.equal("5")
            })

            it("will cache the generatedLookAhead functions AFTER (check cache is filled)", () => {
                let parser = new OptionsImplicitLookAheadParser()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(5)
            })
        })

        describe("The implicit lookahead calculation functionality of the Recognizer For MANY", () => {

            class ManyImplicitLookAheadParser extends Parser {

                public getLookAheadCache():HashTable<Function> {
                    return getLookaheadFuncsForClass(this.className)
                }

                constructor(input:Token[] = []) {
                    super(input, ALL_TOKENS);
                    (<any>Parser).performSelfAnalysis(this)
                }

                public manyRule = this.RULE("manyRule", this.parseManyRule, () => { return "-666" })

                private parseManyRule():string {
                    let total = ""

                    this.MANY1(() => {
                        this.CONSUME1(OneTok)
                        total += "1"
                    })

                    this.MANY2(() => {
                        this.CONSUME1(TwoTok)
                        total += "2"
                    })

                    this.MANY3(() => {
                        this.CONSUME1(ThreeTok)
                        total += "3"
                    })

                    this.MANY4(() => {
                        this.CONSUME1(FourTok)
                        total += "4"
                    })

                    this.MANY5(() => {
                        this.CONSUME1(FiveTok)
                        total += "5"
                    })

                    return total
                }
            }

            it("will cache the generatedLookAhead functions BEFORE (check cache is clean)", () => {
                let parser = new ManyImplicitLookAheadParser()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(0)
            })

            it("can automatically compute lookahead for MANY1", () => {
                let input = [createToken(OneTok)]
                let parser = new ManyImplicitLookAheadParser(input)
                expect(parser.manyRule()).to.equal("1")
            })

            it("can automatically compute lookahead for MANY2", () => {
                let input = [createToken(TwoTok)]
                let parser = new ManyImplicitLookAheadParser(input)
                expect(parser.manyRule()).to.equal("2")
            })

            it("can automatically compute lookahead for MANY3", () => {
                let input = [createToken(ThreeTok)]
                let parser = new ManyImplicitLookAheadParser(input)
                expect(parser.manyRule()).to.equal("3")
            })

            it("can automatically compute lookahead for MANY4", () => {
                let input = [createToken(FourTok)]
                let parser = new ManyImplicitLookAheadParser(input)
                expect(parser.manyRule()).to.equal("4")
            })

            it("can automatically compute lookahead for MANY5", () => {
                let input = [createToken(FiveTok)]
                let parser = new ManyImplicitLookAheadParser(input)
                expect(parser.manyRule()).to.equal("5")
            })

            it("can accept lookahead function param for flow mixing several MANYs", () => {
                let input = [createToken(OneTok), createToken(OneTok), createToken(ThreeTok),
                    createToken(ThreeTok), createToken(ThreeTok), createToken(FiveTok)]
                let parser = new ManyImplicitLookAheadParser(input)
                expect(parser.manyRule()).to.equal("113335")
            })

            it("will cache the generatedLookAhead functions AFTER (check cache is filled)", () => {
                let parser = new ManyImplicitLookAheadParser()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(5)
            })
        })

        describe("The implicit lookahead calculation functionality of the Recognizer For MANY_SEP", () => {

            class ManySepImplicitLookAheadParser extends Parser {

                public getLookAheadCache():HashTable<Function> {
                    return getLookaheadFuncsForClass(this.className)
                }

                constructor(input:Token[] = []) {
                    super(input, ALL_TOKENS);
                    (<any>Parser).performSelfAnalysis(this)
                }

                public manySepRule = this.RULE("manySepRule", this.parseManyRule, () => { return {total: 666, separators: []} })

                private parseManyRule():any {

                    let total = ""
                    let separators = []

                    separators = separators.concat(this.MANY_SEP1(Comma, () => {
                        this.CONSUME1(OneTok)
                        total += "1"
                    }).separators)

                    separators = separators.concat(this.MANY_SEP2(Comma, () => {
                        this.CONSUME1(TwoTok)
                        total += "2"
                    }).separators)

                    separators = separators.concat(this.MANY_SEP3(Comma, () => {
                        this.CONSUME1(ThreeTok)
                        total += "3"
                    }).separators)

                    separators = separators.concat(this.MANY_SEP4(Comma, () => {
                        this.CONSUME1(FourTok)
                        total += "4"
                    }).separators)

                    separators = separators.concat(this.MANY_SEP5(Comma, () => {
                        this.CONSUME1(FiveTok)
                        total += "5"
                    }).separators)

                    return {total: total, separators: separators}
                }
            }

            it("will cache the generatedLookAhead functions BEFORE (check cache is clean)", () => {
                let parser = new ManySepImplicitLookAheadParser()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(0)
            })

            it("can automatically compute lookahead for MANY_SEP1", () => {
                let input = [createToken(OneTok)]
                let parser = new ManySepImplicitLookAheadParser(input)
                expect(parser.manySepRule().total).to.equal("1")
            })

            it("can automatically compute lookahead for MANY_SEP2", () => {
                let input = [createToken(TwoTok)]
                let parser = new ManySepImplicitLookAheadParser(input)
                expect(parser.manySepRule().total).to.equal("2")
            })

            it("can automatically compute lookahead for MANY_SEP3", () => {
                let input = [createToken(ThreeTok)]
                let parser = new ManySepImplicitLookAheadParser(input)
                expect(parser.manySepRule().total).to.equal("3")
            })

            it("can automatically compute lookahead for MANY_SEP4", () => {
                let input = [createToken(FourTok)]
                let parser = new ManySepImplicitLookAheadParser(input)
                expect(parser.manySepRule().total).to.equal("4")
            })

            it("can automatically compute lookahead for MANY_SEP5", () => {
                let input = [createToken(FiveTok)]
                let parser = new ManySepImplicitLookAheadParser(input)
                expect(parser.manySepRule().total).to.equal("5")
            })

            it("can accept lookahead function param for flow mixing several MANY_SEPs", () => {
                let input = [createToken(OneTok), createToken(Comma), createToken(OneTok), createToken(ThreeTok), createToken(Comma),
                    createToken(ThreeTok), createToken(Comma), createToken(ThreeTok), createToken(FiveTok)]
                let parser = new ManySepImplicitLookAheadParser(input)
                let result = parser.manySepRule()
                expect(result.total).to.equal("113335")
                expect(result.separators).to.have.length(3)
                expect(result.separators).to.deep.equal([createToken(Comma), createToken(Comma), createToken(Comma)])
            })

            it("will cache the generatedLookAhead functions AFTER (check cache is filled)", () => {
                let parser = new ManySepImplicitLookAheadParser()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(5)
            })
        })

        describe("The implicit lookahead calculation functionality of the Recognizer For AT_LEAST_ONE", () => {

            class AtLeastOneImplicitLookAheadParser extends Parser {

                public getLookAheadCache():HashTable<Function> {
                    return getLookaheadFuncsForClass(this.className)
                }

                constructor(input:Token[] = []) {
                    super(input, ALL_TOKENS);
                    (<any>Parser).performSelfAnalysis(this)
                }

                public atLeastOneRule = this.RULE("atLeastOneRule", this.parseAtLeastOneRule, {recoveryValueFunc: () => { return "-666" }})

                private parseAtLeastOneRule():string {
                    let total = ""

                    this.AT_LEAST_ONE1(() => {
                        this.CONSUME1(OneTok)
                        total += "1"
                    }, "Ones")

                    this.AT_LEAST_ONE2(() => {
                        this.CONSUME1(TwoTok)
                        total += "2"
                    }, "Twos")

                    this.AT_LEAST_ONE3(() => {
                        this.CONSUME1(ThreeTok)
                        total += "3"
                    }, "Threes")

                    this.AT_LEAST_ONE4(() => {
                        this.CONSUME1(FourTok)
                        total += "4"
                    }, "Fours")

                    this.AT_LEAST_ONE5(() => {
                        this.CONSUME1(FiveTok)
                        total += "5"
                    }, "Fives")

                    return total
                }
            }

            it("will cache the generatedLookAhead functions BEFORE (check cache is clean)", () => {
                let parser = new AtLeastOneImplicitLookAheadParser()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(0)
            })

            it("can accept lookahead function param for AT_LEAST_ONE1-5", () => {
                let input = [createToken(OneTok), createToken(TwoTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(FourTok), createToken(FourTok), createToken(FiveTok)]
                let parser = new AtLeastOneImplicitLookAheadParser(input)
                expect(parser.atLeastOneRule()).to.equal("1223445")
            })

            it("will fail when zero occurrences of AT_LEAST_ONE in input", () => {
                let input = [createToken(OneTok), createToken(TwoTok), /*createToken(ThreeTok),*/
                    createToken(FourTok), createToken(FiveTok)]
                let parser = new AtLeastOneImplicitLookAheadParser(input)
                expect(parser.atLeastOneRule()).to.equal("-666")
            })

            it("will cache the generatedLookAhead functions AFTER (check cache is filled)", () => {
                let parser = new AtLeastOneImplicitLookAheadParser()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(5)
            })
        })

        describe("The implicit lookahead calculation functionality of the Recognizer For AT_LEAST_ONE_SEP", () => {

            class AtLeastOneSepImplicitLookAheadParser extends Parser {

                public getLookAheadCache():HashTable<Function> {
                    return getLookaheadFuncsForClass(this.className)
                }

                constructor(input:Token[] = []) {
                    super(input, ALL_TOKENS);
                    (<any>Parser).performSelfAnalysis(this)
                }

                public atLeastOneSepRule = this.RULE("atLeastOneSepRule", this.parseAtLeastOneRule,
                    {recoveryValueFunc: () => { return {total: "-666", separators: []}}})

                private parseAtLeastOneRule():any {
                    let total = ""
                    let separators = []

                    separators = separators.concat(this.AT_LEAST_ONE_SEP1(Comma, () => {
                        this.CONSUME1(OneTok)
                        total += "1"
                    }, "Ones").separators)

                    separators = separators.concat(this.AT_LEAST_ONE_SEP2(Comma, () => {
                        this.CONSUME1(TwoTok)
                        total += "2"
                    }, "Twos").separators)

                    separators = separators.concat(this.AT_LEAST_ONE_SEP3(Comma, () => {
                        this.CONSUME1(ThreeTok)
                        total += "3"
                    }, "Threes").separators)

                    separators = separators.concat(this.AT_LEAST_ONE_SEP4(Comma, () => {
                        this.CONSUME1(FourTok)
                        total += "4"
                    }, "Fours").separators)

                    separators = separators.concat(this.AT_LEAST_ONE_SEP5(Comma, () => {
                        this.CONSUME1(FiveTok)
                        total += "5"
                    }, "Fives").separators)

                    return {total: total, separators: separators}
                }
            }

            it("will cache the generatedLookAhead functions BEFORE (check cache is clean)", () => {
                let parser = new AtLeastOneSepImplicitLookAheadParser()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(0)
            })

            it("can accept lookahead function param for AT_LEAST_ONE_SEP1-5", () => {
                let input = [createToken(OneTok), createToken(TwoTok), createToken(Comma), createToken(TwoTok), createToken(ThreeTok),
                    createToken(FourTok), createToken(Comma), createToken(FourTok), createToken(FiveTok)]
                let parser = new AtLeastOneSepImplicitLookAheadParser(input)
                let parseResult = parser.atLeastOneSepRule()
                expect(parseResult.total).to.equal("1223445")
                expect(parseResult.separators).to.deep.equal([createToken(Comma), createToken(Comma)])
            })

            it("will fail when zero occurrences of AT_LEAST_ONE_SEP in input", () => {
                let input = [createToken(OneTok), createToken(TwoTok),
                    /*createToken(ThreeTok),*/ createToken(FourTok), createToken(FiveTok)]
                let parser = new AtLeastOneSepImplicitLookAheadParser(input)
                expect(parser.atLeastOneSepRule().total).to.equal("-666")
            })

            it("will cache the generatedLookAhead functions AFTER (check cache is filled)", () => {
                let parser = new AtLeastOneSepImplicitLookAheadParser()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(5)
            })
        })

        describe("The implicit lookahead calculation functionality of the Recognizer For OR", () => {

            class OrImplicitLookAheadParser extends Parser {

                public getLookAheadCache():HashTable<Function> {
                    return getLookaheadFuncsForClass(this.className)
                }

                constructor(input:Token[] = []) {
                    super(input, ALL_TOKENS);
                    (<any>Parser).performSelfAnalysis(this)
                }

                public orRule = this.RULE("orRule", this.parseOrRule, {recoveryValueFunc: () => "-666"})

                private parseOrRule():string {
                    let total = ""

                    // @formatter:off
            this.OR1([
                {ALT: () => {
                    this.CONSUME1(OneTok)
                    total += "A1"
                }},
                {ALT: () => {
                    this.CONSUME1(TwoTok)
                    total += "A2"
                }},
                {ALT: () => {
                    this.CONSUME1(ThreeTok)
                    total += "A3"
                }},
                {ALT: () => {
                    this.CONSUME1(FourTok)
                    total += "A4"
                }},
                {ALT: () => {
                    this.CONSUME1(FiveTok)
                    total += "A5"
                }},
            ])

            this.OR2([
                {ALT: () => {
                    this.CONSUME2(OneTok)
                    total += "B1"
                }},
                {ALT: () => {
                    this.CONSUME2(FourTok)
                    total += "B4"
                }},
                {ALT: () => {
                    this.CONSUME2(ThreeTok)
                    total += "B3"
                }},
                 {ALT: () => {
                    this.CONSUME2(TwoTok)
                    total += "B2"
                }},
                {ALT: () => {
                    this.CONSUME2(FiveTok)
                    total += "B5"
                }},
            ], "digits")

            this.OR3([
                {ALT: () => {
                    this.CONSUME3(TwoTok)
                    total += "C2"
                }},
                {ALT: () => {
                    this.CONSUME3(FourTok)
                    total += "C4"
                }},
                {ALT: () => {
                    this.CONSUME3(ThreeTok)
                    total += "C3"
                }},
                {ALT: () => {
                    this.CONSUME3(FiveTok)
                    total += "C5"
                }},
                 {ALT: () => {
                    this.CONSUME3(OneTok)
                    total += "C1"
                }}
            ], "digits")

            this.OR4([
                {ALT: () => {
                    this.CONSUME4(OneTok)
                    total += "D1"
                }},
                {ALT: () => {
                    this.CONSUME4(ThreeTok)
                    total += "D3"
                }},
                {ALT: () => {
                    this.CONSUME4(FourTok)
                    total += "D4"
                }},
                {ALT: () => {
                    this.CONSUME4(TwoTok)
                    total += "D2"
                }},
                {ALT: () => {
                    this.CONSUME4(FiveTok)
                    total += "D5"
                }}
            ], "digits")

            this.OR5([
                {ALT: () => {
                    this.CONSUME5(TwoTok)
                    total += "E2"
                }},
                 {ALT: () => {
                    this.CONSUME5(OneTok)
                    total += "E1"
                }},
                {ALT: () => {
                    this.CONSUME5(FourTok)
                    total += "E4"
                }},
                 {ALT: () => {
                    this.CONSUME5(ThreeTok)
                    total += "E3"
                }},
                {ALT: () => {
                    this.CONSUME5(FiveTok)
                    total += "E5"
                }},
            ], "digits")

            // @formatter:on
                    return total
                }
            }

            it("will cache the generatedLookAhead functions BEFORE (check cache is clean)", () => {
                let parser = new OrImplicitLookAheadParser()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(0)
            })

            it("can compute the lookahead automatically for OR1-5", () => {
                let input = [createToken(OneTok), createToken(TwoTok), createToken(ThreeTok), createToken(FourTok), createToken(FiveTok)]
                let parser = new OrImplicitLookAheadParser(input)
                expect(parser.orRule()).to.equal("A1B2C3D4E5")
            })

            it("will fail when none of the alternatives match", () => {
                let input = [createToken(SixTok)]
                let parser = new OrImplicitLookAheadParser(input)
                expect(parser.orRule()).to.equal("-666")
            })

            it("will cache the generatedLookAhead functions AFTER (check cache is filled)", () => {
                let parser = new OrImplicitLookAheadParser()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(5)
            })
        })

        describe("OR production ambiguity detection when using implicit lookahead calculation", () => {

            it("will throw an error when two alternatives have the same single token (lookahead 1) prefix", () => {

                class OrAmbiguityLookAheadParser extends Parser {

                    constructor(input:Token[] = []) {
                        super(input, ALL_TOKENS);
                        (<any>Parser).performSelfAnalysis(this)
                    }

                    public ambiguityRule = this.RULE("ambiguityRule", this.parseAmbiguityRule)

                    private parseAmbiguityRule():void {

                        // @formatter:off
            this.OR1([
                {ALT: () => {
                    this.CONSUME1(OneTok)
                }},
                {ALT: () => { // <-- this alternative starts with the same token as the previous one, ambiguity!
                    this.CONSUME2(OneTok)
                }},
                {ALT: () => {
                    this.CONSUME2(TwoTok)
                }},
                {ALT: () => {
                    this.CONSUME2(ThreeTok)
                }}
            ], "digits")
            // @formatter:on
                    }
                }

                expect(() => new OrAmbiguityLookAheadParser()).to.throw("Ambiguous alternatives")
                expect(() => new OrAmbiguityLookAheadParser()).to.throw("OneTok")
            })

            it("will throw an error when two alternatives have the same multi token (lookahead > 1) prefix", () => {

                class OrAmbiguityMultiTokenLookAheadParser extends Parser {

                    constructor(input:Token[] = []) {
                        super(input, ALL_TOKENS);
                        (<any>Parser).performSelfAnalysis(this)
                    }

                    public ambiguityRule = this.RULE("ambiguityRule", this.parseAmbiguityRule)

                    private parseAmbiguityRule():void {

                        // @formatter:off
            this.OR1([
                {ALT: () => {
                    this.CONSUME1(OneTok)
                }},
                {ALT: () => {
                    this.CONSUME1(TwoTok)
                    this.CONSUME1(ThreeTok)
                    this.CONSUME1(FourTok)
                }},
                {ALT: () => {
                    this.CONSUME2(TwoTok)
                    this.CONSUME2(ThreeTok)
                    this.CONSUME2(FourTok)
                }}
            ], "digits")
            // @formatter:on
                    }
                }
                expect(() => new OrAmbiguityMultiTokenLookAheadParser()).to.throw("Ambiguous alternatives")
                expect(() => new OrAmbiguityMultiTokenLookAheadParser()).to.throw("TwoTok, ThreeTok, FourTok")
            })
        })

        describe("The implicit lookahead calculation functionality of the Recognizer For OR (with IGNORE_AMBIGUITIES)", () => {

            class OrImplicitLookAheadParserIgnoreAmbiguities extends Parser {

                public getLookAheadCache():HashTable<Function> {
                    return getLookaheadFuncsForClass(this.className)
                }

                constructor(input:Token[] = []) {
                    super(input, ALL_TOKENS, {
                        ignoredIssues: {
                            orRule: {
                                OR1: true,
                                OR2: true,
                                OR3: true,
                                OR4: true,
                                OR5: true
                            }
                        }
                    });

                    (<any>Parser).performSelfAnalysis(this)
                }

                public orRule = this.RULE("orRule", this.parseOrRule, {recoveryValueFunc: () => "-666"})

                private parseOrRule():string {
                    let total = ""

                    // @formatter:off
            this.OR([
                {ALT: () => {
                    this.CONSUME1(OneTok)
                    total += "A1"
                }},
                {ALT: () => {
                    this.CONSUME2(OneTok)
                    total += "OOPS!"
                }},
                {ALT: () => {
                    this.CONSUME1(ThreeTok)
                    total += "A3"
                }},
                {ALT: () => {
                    this.CONSUME1(FourTok)
                    total += "A4"
                }},
                {ALT: () => {
                    this.CONSUME1(FiveTok)
                    total += "A5"
                }},
            ], "digits")

            this.OR2([
                {ALT: () => {
                    this.CONSUME2(FourTok)
                    total += "B4"
                }},
                {ALT: () => {
                    this.CONSUME2(ThreeTok)
                    total += "B3"
                }},
                 {ALT: () => {
                    this.CONSUME2(TwoTok)
                    total += "B2"
                }},
                {ALT: () => {
                    this.CONSUME3(TwoTok)
                    total += "OOPS!"
                }},
                {ALT: () => {
                    this.CONSUME2(FiveTok)
                    total += "B5"
                }},
            ], "digits")

            this.OR3([
                {ALT: () => {
                    this.CONSUME3(FourTok)
                    total += "C4"
                }},
                {ALT: () => {
                    this.CONSUME3(ThreeTok)
                    total += "C3"
                }},
                {ALT: () => {
                    this.CONSUME4(ThreeTok)
                    total += "OOPS!"
                }},
                {ALT: () => {
                    this.CONSUME3(FiveTok)
                    total += "C5"
                }},
                 {ALT: () => {
                    this.CONSUME3(OneTok)
                    total += "C1"
                }}
            ], "digits")

            this.OR4([
                {ALT: () => {
                    this.CONSUME4(OneTok)
                    total += "D1"
                }},
                {ALT: () => {
                    this.CONSUME4(FourTok)
                    total += "D4"
                }},
                {ALT: () => {
                    this.CONSUME5(FourTok)
                    total += "OOPS!"
                }},
                {ALT: () => {
                    this.CONSUME4(TwoTok)
                    total += "D2"
                }},
            ], "digits")

            this.OR5([
                {ALT: () => {
                    this.CONSUME5(TwoTok)
                    total += "E2"
                }},
                 {ALT: () => {
                    this.CONSUME5(OneTok)
                    total += "E1"
                }},
                {ALT: () => {
                    this.CONSUME4(FiveTok)
                    total += "E5"
                }},
                 {ALT: () => {
                    this.CONSUME5(ThreeTok)
                    total += "E3"
                }},
                {ALT: () => {
                    this.CONSUME5(FiveTok)
                    total += "OOPS!"
                }},
            ], "digits")

            // @formatter:on
                    return total
                }
            }


            it("will cache the generatedLookAhead functions BEFORE (check cache is clean)", () => {
                let parser = new OrImplicitLookAheadParserIgnoreAmbiguities()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(0)
            })

            it("can compute the lookahead automatically for OR1-5", () => {
                let input = [createToken(OneTok), createToken(TwoTok), createToken(ThreeTok), createToken(FourTok), createToken(FiveTok)]
                let parser = new OrImplicitLookAheadParserIgnoreAmbiguities(input)
                expect(parser.orRule()).to.equal("A1B2C3D4E5")
            })

            it("will fail when none of the alternatives match", () => {
                let input = [createToken(SixTok)]
                let parser = new OrImplicitLookAheadParserIgnoreAmbiguities(input)
                expect(parser.orRule()).to.equal("-666")
            })

            it("will cache the generatedLookAhead functions AFTER (check cache is filled)", () => {
                let parser = new OrImplicitLookAheadParserIgnoreAmbiguities()
                let lookaheadCache = parser.getLookAheadCache()
                expect(lookaheadCache.keys().length).to.equal(5)
            })
        })

        describe("The support for MultiToken (K>1) implicit lookahead capabilities in DSL Production:", () => {

            it("OPTION", () => {
                class MultiTokenLookAheadForOptionParser extends Parser {

                    constructor(input:Token[] = []) {
                        super(input, ALL_TOKENS);
                        (<any>Parser).performSelfAnalysis(this)
                    }

                    public rule = this.RULE("rule", () => {
                        let result = "OPTION Not Taken"
                        this.OPTION(() => {
                            this.CONSUME1(OneTok)
                            this.CONSUME1(TwoTok)
                            this.CONSUME1(ThreeTok)
                            result = "OPTION Taken"
                        })
                        this.CONSUME2(OneTok)
                        this.CONSUME2(TwoTok)
                        return result
                    })
                }

                let parser = new MultiTokenLookAheadForOptionParser([createToken(OneTok), createToken(TwoTok)])
                expect(parser.rule()).to.equal("OPTION Not Taken")

                let parser2 = new MultiTokenLookAheadForOptionParser([createToken(OneTok),
                    createToken(TwoTok), createToken(ThreeTok), createToken(
                        OneTok), createToken(TwoTok)])
                expect(parser2.rule()).to.equal("OPTION Taken")
            })

            it("MANY", () => {
                class MultiTokenLookAheadForManyParser extends Parser {

                    constructor(input:Token[] = []) {
                        super(input, ALL_TOKENS);
                        (<any>Parser).performSelfAnalysis(this)
                    }

                    public rule = this.RULE("orRule", () => {
                        let numOfIterations = 0
                        this.MANY(() => {
                            this.CONSUME1(OneTok)
                            this.CONSUME1(TwoTok)
                            this.CONSUME1(ThreeTok)
                            numOfIterations++
                        })
                        this.CONSUME2(OneTok)
                        this.CONSUME2(TwoTok)
                        return numOfIterations
                    })
                }

                let parser = new MultiTokenLookAheadForManyParser([createToken(OneTok), createToken(TwoTok)])
                expect(parser.rule()).to.equal(0)

                let oneIterationParser = new MultiTokenLookAheadForManyParser([
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok)
                ])
                expect(oneIterationParser.rule()).to.equal(1)

                let twoIterationsParser = new MultiTokenLookAheadForManyParser([
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok)])

                expect(twoIterationsParser.rule()).to.equal(2)
            })

            it("MANY_SEP", () => {
                class MultiTokenLookAheadForManySepParser extends Parser {

                    constructor(input:Token[] = []) {
                        super(input, ALL_TOKENS);
                        (<any>Parser).performSelfAnalysis(this)
                    }

                    public rule = this.RULE("orRule", () => {
                        let numOfIterations = 0
                        this.MANY_SEP(Comma, () => {
                            this.CONSUME1(OneTok)
                            this.CONSUME1(TwoTok)
                            this.CONSUME1(ThreeTok)
                            numOfIterations++
                        })
                        this.CONSUME2(OneTok)
                        this.CONSUME2(TwoTok)
                        return numOfIterations
                    })
                }

                let parser = new MultiTokenLookAheadForManySepParser([createToken(OneTok), createToken(TwoTok)])
                expect(parser.rule()).to.equal(0)

                let oneIterationParser = new MultiTokenLookAheadForManySepParser([
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok)])
                expect(oneIterationParser.rule()).to.equal(1)

                let twoIterationsParser = new MultiTokenLookAheadForManySepParser([
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok), createToken(Comma),
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok)])
                expect(twoIterationsParser.rule()).to.equal(2)
            })

            it("OR", () => {
                class MultiTokenLookAheadForOrParser extends Parser {

                    constructor(input:Token[] = []) {
                        super(input, ALL_TOKENS);
                        (<any>Parser).performSelfAnalysis(this)
                    }

                    public orRule = this.RULE("orRule", () => {
                        return this.OR([
                            // @formatter:off
                    {ALT: () => {
                        this.CONSUME1(OneTok)
                        this.CONSUME2(OneTok)
                        return "alt1 Taken"
                    }},
                    {ALT: () => {
                        this.CONSUME3(OneTok)
                        this.CONSUME1(TwoTok)
                        this.CONSUME1(ThreeTok)
                        return "alt2 Taken"
                    }},
                    {ALT: () => {
                        this.CONSUME4(OneTok)
                        this.CONSUME2(TwoTok)
                        return "alt3 Taken"
                    }},
                    {ALT: () => {
                        this.CONSUME1(FourTok)
                        return "alt4 Taken"
                    }}
                    // @formatter:on
                        ])
                    })
                }

                let alt1Parser = new MultiTokenLookAheadForOrParser([createToken(OneTok), createToken(OneTok)])
                expect(alt1Parser.orRule()).to.equal("alt1 Taken")

                let alt2Parser = new MultiTokenLookAheadForOrParser([createToken(OneTok), createToken(TwoTok), createToken(ThreeTok)])
                expect(alt2Parser.orRule()).to.equal("alt2 Taken")

                let alt3Parser = new MultiTokenLookAheadForOrParser([createToken(OneTok), createToken(TwoTok)])
                expect(alt3Parser.orRule()).to.equal("alt3 Taken")

                let alt4Parser = new MultiTokenLookAheadForOrParser([createToken(FourTok)])
                expect(alt4Parser.orRule()).to.equal("alt4 Taken")
            })

            it("AT_LEAST_ONE", () => {
                class MultiTokenLookAheadForAtLeastOneParser extends Parser {

                    constructor(input:Token[] = []) {
                        super(input, ALL_TOKENS);
                        (<any>Parser).performSelfAnalysis(this)
                    }

                    public rule = this.RULE("orRule", () => {
                        let numOfIterations = 0
                        this.AT_LEAST_ONE(() => {
                            this.CONSUME1(OneTok)
                            this.CONSUME1(TwoTok)
                            this.CONSUME1(ThreeTok)
                            numOfIterations++
                        })
                        this.CONSUME2(OneTok)
                        this.CONSUME2(TwoTok)
                        return numOfIterations
                    })
                }

                let oneIterationParser = new MultiTokenLookAheadForAtLeastOneParser([
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok)
                ])
                expect(oneIterationParser.rule()).to.equal(1)

                let twoIterationsParser = new MultiTokenLookAheadForAtLeastOneParser([
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok)])

                expect(twoIterationsParser.rule()).to.equal(2)

                let threeIterationsParser = new MultiTokenLookAheadForAtLeastOneParser([
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok)])

                expect(threeIterationsParser.rule()).to.equal(3)
            })

            it("AT_LEAST_ONE_SEP", () => {
                class MultiTokenLookAheadForAtLeastOneSepParser extends Parser {

                    constructor(input:Token[] = []) {
                        super(input, ALL_TOKENS);
                        (<any>Parser).performSelfAnalysis(this)
                    }

                    public rule = this.RULE("orRule", () => {
                        let numOfIterations = 0
                        this.AT_LEAST_ONE_SEP(Comma, () => {
                            this.CONSUME1(OneTok)
                            this.CONSUME1(TwoTok)
                            this.CONSUME1(ThreeTok)
                            numOfIterations++
                        })
                        this.CONSUME2(OneTok)
                        this.CONSUME2(TwoTok)
                        return numOfIterations
                    })
                }

                let oneIterationParser = new MultiTokenLookAheadForAtLeastOneSepParser([
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok)])
                expect(oneIterationParser.rule()).to.equal(1)

                let twoIterationsParser = new MultiTokenLookAheadForAtLeastOneSepParser([
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok), createToken(Comma),
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok)])
                expect(twoIterationsParser.rule()).to.equal(2)

                let threeIterationsParser = new MultiTokenLookAheadForAtLeastOneSepParser([
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok), createToken(Comma),
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok), createToken(Comma),
                    createToken(OneTok), createToken(TwoTok), createToken(ThreeTok),
                    createToken(OneTok), createToken(TwoTok)])
                expect(threeIterationsParser.rule()).to.equal(3)
            })
        })
    })
}

defineLookaheadSpecs("Regular Tokens Mode", extendToken, createRegularToken, tokenInstanceofMatcher)
defineLookaheadSpecs("Lazy Tokens Mode", extendLazyToken, createLazyToken, tokenInstanceofMatcher)
defineLookaheadSpecs("Simple Lazy Tokens Mode", extendSimpleLazyToken, createSimpleToken, tokenStructuredMatcher)

