# High-priority
-   Pagination needs to be implemented for the `Select` form field
    -   `Select` in `SupplierInformationFieldset` should then be refactored to use pagination

# Medium-priority
*none at the moment*

# Low-priority
- `input:type="date"` in the `DateSelect` component is making the placeholder override (currently not possible) problematic. Rather then changing the html `type` attributes on `onBlur`/`onFocus` & having to recustomize design, a rather easy solution would be to use 3rd party date selectors

# No-priority
-   Delete `ControlField` to remove unnecessary `Field` encapsulation, and use `Field` instead for consistency
-   Replace unnecessarily instantiated constant `class` exports (found in `/formatters`, there may be more):
    -   make `public` methods `public static`
    -   export `class` instead of instance
    -   remove instance `export`
    -   fix all imports to use the `static` methods
-   Encapsulate `i18n` & enforce proper use of `macros`

# Potential boiling frogs
The issues written here are percieved/expected to increase the amount of duplicate code, risking to unreasonably & exponentially increase the cost of the feature updates in the longrun. The urgency of the below issues should be decided with this project's lifecycle in mind.

-   Standardize form fields' error path implementation & implement an approach that doesn't use full paths (finishing the currently partial implementation & passing the `errorPath` maybe?).
-   Standardize `readOnly` fieldset renders in a way that it can be achived by simply passing a prop to the child components instead of an almost carbon-copy of the edit state code.
