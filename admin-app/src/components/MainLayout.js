import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { BiMessageAltDetail } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import useListenOrder from "../zustand/useListenOrder";
import useConversation from "../zustand/useConversation";
import { CiShop } from "react-icons/ci";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  useListenOrder();
  const { selectedOrder } = useConversation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const [click, setClick] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.split("/")[2] || "";
    setSelectedKey(path);
  }, [location]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: "",
      icon: <AiOutlineDashboard className="fs-4" />,
      label: "Giao diện quản trị",
    },
    {
      key: "customers",
      icon: <AiOutlineUser className="fs-4" />,
      label: "Quản lý người dùng",
    },
    {
      key: "list-product",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      label: "Quản lý sản phẩm",
    },
    {
      key: "list-brand",
      icon: <SiBrandfolder className="fs-4" />,
      label: "Quản lý thương hiệu",
    },
    {
      key: "list-category",
      icon: <BiCategoryAlt className="fs-4" />,
      label: "Quản lý danh mục sản phẩm",
    },
    {
      key: "orders",
      icon: <FaClipboardList className="fs-4" />,
      label: "Quản lý đơn hàng",
    },
    {
      key: "coupon-list",
      icon: <RiCouponLine className="fs-4" />,
      label: "Quản lý mã giảm giá",
    },
    {
      key: "blog-list",
      icon: <FaBloggerB className="fs-4" />,
      label: "Quản lý bài viết",
    },
    {
      key: "blog-category-list",
      icon: <FaBloggerB className="fs-4" />,
      label: "Quản lý danh mục bài viết",
    },
    {
      key: "enquiries",
      icon: <FaClipboardList className="fs-4" />,
      label: "Quản lý khảo sát khách hàng",
    },
    {
      key: "messages",
      icon: <BiMessageAltDetail className="fs-4" />,
      label: "Quản lý tin nhắn khách hàng",
    },
  ];
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const authState = useSelector((state) => state?.auth);
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("user");
    window.location.reload();
  };
  useEffect(() => {
    if (authState.user === null && authState.isSuccess !== true) {
      navigate("/");
    }
  }, [authState]);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">DP</span>
            <span
              className="lag-logo"
              style={{ fontSize: "25px", fontWeight: "bold" }}
            >
              DEV PTIT
            </span>
          </h2>
        </div>

        <Link to="/counter">
          <div className="counter" style={{ marginTop: "10px" }}>
            <CiShop className="fs-4" /> <p>Bán hàng tại quầy</p>
          </div>
        </Link>

        <hr style={{ border: "0.5px solid white", margin: "10px 0" }} />

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            setSelectedKey(key);
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              // onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div
              className="position-relative"
              onClick={() => {
                setClick(!click);
              }}
            >
              <IoIosNotifications className="fs-4" />
              <span
                className="badge rounded-circle p-1 position-absolute"
                style={{ backgroundColor: "#1677ff" }}
              >
                {selectedOrder.length}
              </span>
            </div>
            {click && (
              <>
                <Notification data={selectedOrder} />
              </>
            )}
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{user.user?.name}</h5>
                <p className="mb-0">{user.user?.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    onClick={handleLogout}
                    style={{ height: "auto", lineHeight: "20px" }}
                  >
                    Logout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
