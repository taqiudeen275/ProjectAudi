# @audilink/contracts

Versioned application and worker contracts for AudiLink Studio, Books, Admin, and the control plane.

The package deliberately represents Studio Credits, Reader Coins, and fiat as incompatible types. Values crossing an HTTP boundary still require schema validation in the control API; these TypeScript definitions are the compile-time contract and are not a substitute for runtime validation.

