const stubs={}

stubs.cpp=`#include <iostream>
using namespace std;
int main() {
    // Your C++ code here
    cout << "Hello, world!" << endl;
    return 0;
}

`

stubs.Python=`# Your Python code here
print("Hello, world!")


`
 stubs.Java=`public class Main {
    public static void main(String[] args) {
        // Your Java code here
        System.out.println("Hello, world!");
    }
}

 
`

export default stubs;
