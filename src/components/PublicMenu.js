"use client";
import { useRouter } from "next/navigation";

export default function PublicMenu() {
  const router = useRouter();

  const onLoginPage = () => {
    router.push("/login", { scroll: false });
  };

  return (
    <header className="py-2 bg-white">
      <nav className="w-full">
        <div className="max-w-5xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <a href="/">Portfolio Rian</a>
            </div>
            <div>
              <ul className="flex flex-row gap-6">
                {/* <li className="mt-1">
                      <a className="btn-link" href="/about">About</a>
                    </li>
                    <li className="mt-1">
                      <a className="btn-link" href="/work">Work</a>
                    </li> */}
                <li className="mt-1">
                  <a className="btn-link" href="/blogs">
                    Blogs
                  </a>
                </li>
                {/* <li className="mt-1">
                      <a className="btn-link" href="/contact">Contact</a>
                    </li> */}
                <li>
                  <button className="btn-primary" onClick={onLoginPage}>
                    <span className="relative text-sm font-semibold text-white">
                      Login
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
