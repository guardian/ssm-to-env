# The path to the interpreter and all of the originally intended arguments
args=("$@")

export TEST_VARIABLE=foo

# Execute the next step
exec ${args[@]}