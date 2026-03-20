import Image from "next/image";

export default function EbookFooter() {
  return (
    <footer
      className="w-full px-8 sm:px-14 lg:px-20 pt-10 pb-6 flex flex-col gap-6"
      style={{ backgroundColor: "#031F3D" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex-shrink-0">
          <Image
            src="/go/Dumbo-Logo-Health-White.svg"
            alt="Dumbo Health"
            width={220}
            height={28}
            className="w-40 sm:w-[220px] h-auto"
            priority
          />
        </div>

        <div className="hidden sm:flex flex-1 items-center justify-center px-6 opacity-40">
          <svg
            viewBox="0 0 1286 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-md h-10"
          >
            <path
              d="M643 47.1023C633.816 47.1023 633.816 17.5493 624.633 17.5493C615.449 17.5493 615.449 47.4861 606.265 47.4861C597.081 47.4861 597.081 1.58838 587.898 1.58838C578.714 1.58838 578.714 54.3674 569.526 54.3674C560.338 54.3674 560.342 43.0351 551.158 43.0351C541.975 43.0351 541.975 7.77802 532.787 7.77802C523.599 7.77802 523.603 34.3203 514.419 34.3203C505.236 34.3203 505.236 5.04918 496.048 5.04918C486.86 5.04918 486.864 34.4175 477.68 34.4175C468.496 34.4175 468.496 35.8127 459.313 35.8127C450.129 35.8127 450.129 45.61 440.941 45.61C431.753 45.61 431.757 15.0692 422.574 15.0692C413.39 15.0692 413.39 61.9996 404.202 61.9996C395.014 61.9996 395.014 4.73887 385.83 4.73887C376.646 4.73887 376.646 65.5884 367.459 65.5884C358.271 65.5884 358.275 30.3171 349.087 30.3171C339.899 30.3171 339.903 38.0488 330.715 38.0488C321.527 38.0488 321.531 65.4012 312.344 65.4012C303.156 65.4012 303.16 16.4194 293.972 16.4194C284.784 16.4194 284.788 44.0679 275.609 44.0679C266.429 44.0679 266.425 30.3621 257.241 30.3621C248.057 30.3621 248.053 26.7663 238.869 26.7663C229.686 26.7663 229.686 61.2014 220.502 61.2014C211.318 61.2014 211.318 30.1584 202.13 30.1584C192.942 30.1584 192.942 6.37571 183.759 6.37571C174.575 6.37571 174.571 29.5591 165.383 29.5591C156.195 29.5591 156.199 23.9853 147.011 23.9853C137.823 23.9853 137.823 16.102 128.639 16.102C119.456 16.102 119.452 21.7065 110.264 21.7065C101.076 21.7065 101.076 15.9883 91.8877 15.9883C82.6998 15.9883 82.704 37.7882 73.5161 37.7882C64.3281 37.7882 64.3281 30.7245 55.1402 30.7245C45.9523 30.7245 45.9522 16.1422 36.7685 16.1422C27.5848 16.1422 27.5764 34.543 18.3843 34.543C9.19214 34.543 9.19213 41.4196 0 41.4196"
              stroke="white"
              strokeWidth="1.99977"
              strokeMiterlimit="10"
            />
            <path
              d="M643 47.1023C652.184 47.1023 652.184 17.5493 661.367 17.5493C670.551 17.5493 670.551 47.4861 679.735 47.4861C688.919 47.4861 688.919 1.58838 698.102 1.58838C707.286 1.58838 707.286 54.3674 716.474 54.3674C725.662 54.3674 725.658 43.0351 734.842 43.0351C744.025 43.0351 744.025 7.77802 753.213 7.77802C762.401 7.77802 762.397 34.3203 771.581 34.3203C780.764 34.3203 780.764 5.04918 789.952 5.04918C799.14 5.04918 799.136 34.4175 808.32 34.4175C817.504 34.4175 817.504 35.8127 826.687 35.8127C835.871 35.8127 835.871 45.61 845.059 45.61C854.247 45.61 854.243 15.0692 863.426 15.0692C872.61 15.0692 872.61 61.9996 881.798 61.9996C890.986 61.9996 890.986 4.73887 900.17 4.73887C909.354 4.73887 909.354 65.5884 918.541 65.5884C927.729 65.5884 927.725 30.3171 936.913 30.3171C946.101 30.3171 946.097 38.0488 955.285 38.0488C964.473 38.0488 964.469 65.4012 973.656 65.4012C982.844 65.4012 982.84 16.4194 992.028 16.4194C1001.22 16.4194 1001.21 44.0679 1010.39 44.0679C1019.57 44.0679 1019.58 30.3621 1028.76 30.3621C1037.94 30.3621 1037.95 26.7663 1047.13 26.7663C1056.31 26.7663 1056.31 61.2014 1065.5 61.2014C1074.68 61.2014 1074.68 30.1584 1083.87 30.1584C1093.06 30.1584 1093.06 6.37571 1102.24 6.37571C1111.43 6.37571 1111.43 29.5591 1120.62 29.5591C1129.81 29.5591 1129.8 23.9853 1138.99 23.9853C1148.18 23.9853 1148.18 16.102 1157.36 16.102C1166.54 16.102 1166.55 21.7065 1175.74 21.7065C1184.92 21.7065 1184.92 15.9883 1194.11 15.9883C1203.3 15.9883 1203.3 37.7882 1212.48 37.7882C1221.67 37.7882 1221.67 30.7245 1230.86 30.7245C1240.05 30.7245 1240.05 16.1422 1249.23 16.1422C1258.42 16.1422 1258.42 34.543 1267.62 34.543C1276.81 34.543 1276.81 41.4196 1286 41.4196"
              stroke="white"
              strokeWidth="1.99977"
              strokeMiterlimit="10"
            />
          </svg>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="https://www.facebook.com/dumbohealth"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
            style={{ border: "1.5px solid rgba(252,246,237,0.5)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/dumbohealth"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
            style={{ border: "1.5px solid rgba(252,246,237,0.5)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/dumbohealth"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
            style={{ border: "1.5px solid rgba(252,246,237,0.5)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>

      <p
        className="text-xs"
        style={{
          color: "rgba(252,246,237,0.5)",
          fontFamily: "var(--font-aeonik)",
        }}
      >
        © 2026 Dumbo Health. All rights reserved.
      </p>
    </footer>
  );
}
