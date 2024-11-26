import { Heart, ArrowRight, Users, Shield, BarChart } from "lucide-react";
import Image from "next/image";
import WLT from "../../Assets/Images/WeLivedIt_Logo.jpg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="w-full bg-white shadow-sm">
        <div className="flex justify-between mx-6 px-4 py-4 items-center">
          <div
            className="flex items-center space-x-4"
            onClick={() => router.push("/home")}
          >
            <Image src={WLT} width={48} height={48} alt="WelivedItBg" />
            <h1 className="text-xl font-bold text-gray-900">WeLivedIt.AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
              Welcome to WeLivedIt.AI
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              Innovating how we make inclusive online spaces
            </p>
            <div className="flex justify-center w-full">
              <button
                className="mt-8 px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-2xl flex items-center"
                onClick={() => router.push("/organization")}
              >
                Enter Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              The Current State of Online Spaces
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-500">73%</h3>
                <p className="mt-4 text-gray-700">
                  of women journalists exposed to online hate speech reported
                  experiencing anxiety, stress, and fear.
                </p>
                <p className="mt-2 text-sm text-gray-500">UNESCO study, 2021</p>
              </div>
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-500">84%</h3>
                <p className="mt-4 text-gray-700">
                  of LGBTQ+ adults experience significant online harassment,
                  with 52% experiencing severe harassment.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  GLAAD's Social Media Safety Index, 2023
                </p>
              </div>
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-500">78%</h3>
                <p className="mt-4 text-gray-700">
                  of employees say reading toxic messages in work communication
                  impacts their mental well-being.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Microsoft's Work Trend Index, 2023
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              How it works
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <Users className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Community Values First
                </h3>
                <p className="text-gray-700">
                  Your community defines what matters. Create your organization,
                  set your values based on your unique needs. The LLM will
                  tailor how it works for you according to these values.
                </p>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <Shield className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Smart Detection
                </h3>
                <p className="text-gray-700">
                  Our text scanner enables you to scan documents to check for
                  hate speech and gives you the option of not having to engage
                  with something that could seriously impact your mental health.
                </p>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <Heart className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Learn & Improve Together
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    Community members can submit content that impacted them
                    negatively, with additional context.
                  </li>
                  <li>
                    The community can discuss these experiences and vote on what
                    should be added to the model as training data.
                  </li>
                  <li>
                    Models improve based on real community feedback, not just
                    algorithms.
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <BarChart className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Share What Works
                </h3>
                <p className="text-gray-700">
                  Communities with similar values can build on each other's
                  learnings, creating a network of more inclusive spaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 md:py-20 text-center bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Ready to Create a More Inclusive Online Space?
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Join us in building a better online community experience for
              everyone.
            </p>
            <div className="flex justify-center w-full">
              <button
                className="mt-8 px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-2xl flex items-center"
                onClick={() => router.push("/organization")}
              >
                Enter Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          © 2024 WeLivedIt.AI. All rights reserved.
        </p>
        <nav className="flex justify-center mt-2 space-x-4">
          <a className="text-xs text-gray-600 hover:underline" href="#">
            Terms of Service
          </a>
          <a className="text-xs text-gray-600 hover:underline" href="#">
            Privacy Policy
          </a>
          <a className="text-xs text-gray-600 hover:underline" href="#">
            References
          </a>
        </nav>
      </footer>
    </div>
  );
}
